import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";
import Hero from "./components/hero";
import Nav from "./components/nav";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;
    // let image = getAsset(entry.getIn(["data", "image"]));
    // let hero = getAsset(entry.getIn(["data", "hero"]));
    //
    // // Bit of a nasty hack to make relative paths work as expected as a background image here
    // if (image && !image.fileObj) {
    //     image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    // }

    return <div>
        <Hero hero={entry.getIn(["data", "hero"])} title={entry.getIn(["data", "title"])} subtitle={entry.getIn(["data", "subtitle"])}/>
        <section className="section">
          <div className="container">
            <div className="content">
              { widgetFor("body") }
            </div>
          </div>
        </section>
    </div>

  }
}
