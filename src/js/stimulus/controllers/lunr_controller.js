import { Controller } from "stimulus";
import "core-js/stable";
import "regenerator-runtime/runtime";
// import {lunr} from "lunr";
var lunr = require('lunr');


export default class extends Controller {
  static targets = ["list", "modal", "input" ];

  initialize() {
    this.loadLunrIndex();
  }

  get query() {
    return this.inputTarget.value;
  }

  async loadLunrIndex() {
    var response = await fetch(this.data.get('url'));
    var index = await response.json();

    this.index = index;
    this.documents = index.reduce(function (memo, doc) {
  	  memo[doc.uri] = doc;
  	  return memo;
  	}, {});

    // Set up lunrjs by declaring the fields we use
    // Also provide their boost level for the ranking
    this.lunrIndex = lunr(function() {
      this.field("uri");
      this.field("title");
      this.field("description");
      this.field("content");
      // ref is the result item identifier (I chose the page URL)
      this.ref("uri");

      // Feed lunr with each file and let lunr actually index them
      index.forEach(function(page) {
        this.add(page);
      }, this);
    });
  }

  hideSearchResult() {
    this.listTarget.classList.toggle('is-active', false);
  }

  showSearchResult() {
    this.listTarget.classList.toggle('is-active', true);
  }

  buildSearchResult(page) {
    let div = document.createElement('div');
    div.className = 'lunr-item p-2 m-2';

    let anchor = document.createElement('a');
    anchor.href = page.uri;

    let title = document.createElement('h5');
    title.className = 'title is-5';
    title.innerHTML = page.title;

    let subtitle = document.createElement('h6');
    subtitle.className = 'subtitle is-6 mb-1';
    subtitle.innerHTML = page.description;

    let description = document.createElement('div');
    description.innerHTML = page.content.substring(0, 250);

    anchor.appendChild(title);
    anchor.appendChild(subtitle);
    anchor.appendChild(description);
    div.appendChild(anchor);

    return div;
  }

  async showResults(event) {
    console.log(event)
    console.log('lunr results');
    if (!this.lunrIndex || !this.index) {
        await this.loadLunrIndex();
    }

    if (this.query.length <= 2) {
      this.hideSearchResult();
      return;
    }

    // this.listTargets.forEach((el, i) => {
    //     el.innerHTML = '';
    // });
    this.listTarget.innerHTML = '';

    var results = this.lunrIndex.search(this.query);

    let resultTitle = document.createElement('div');
    resultTitle.innerHTML = 'Resultat pour : ' + this.query;

    let about = document.createElement('div');
    about.innerHTML = 'About ' + results.length + ' result(s)';

    this.listTarget.appendChild(resultTitle);
    this.listTarget.appendChild(about)

    // Populate List items
    results.slice(0, 10).forEach(function(result) {
      var page = this.documents[result.ref];
      this.listTarget.appendChild(this.buildSearchResult(page));
    }, this);

    this.showSearchResult();
  }
}
