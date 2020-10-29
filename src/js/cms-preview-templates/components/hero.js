import React from "react";
import classNames from "classnames";

import Nav from "./nav";

export default class Hero extends React.Component {
  render() {
    const {hero, title, subtitle} = this.props;
    let className = "hero";
    var heroClass = classNames('hero', hero.get("color"), hero.get("size"), hero.get("others"), {
      'has-background-image': hero.get('backgroundImage')
    });
    let heroBackgroundImage = hero.get('backgroundImage');
    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (heroBackgroundImage && !heroBackgroundImage.fileObj) {
        heroBackgroundImage = window.parent.location.protocol + "//" + window.parent.location.host + heroBackgroundImage;
    }
    return <div className={heroClass} style={{backgroundImage: `url(${heroBackgroundImage})`}} >
      {hero.get('includeTopNav') &&<div class="hero-head">
        <Nav />
      </div>}
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            { title }
          </h1>
          <h2 className="subtitle">
            {subtitle}
          </h2>
        </div>
      </div>
      {hero.get('footer') && <div className="hero-footer has-text-white" style={{zIndex: 1}}>
          <div class="">
            <a href="#about" className="icon has-text-white">
              <i className="fa fa-angle-down fa-3x"></i>
            </a>
          </div>
      </div>}
    </div>;
  }
}
