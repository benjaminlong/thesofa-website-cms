import React from "react";
import classNames from "classnames";

export default class Nav extends React.Component {
  render() {
    return <nav className="navbar"
         role="navigation"
         aria-label="main navigation"
         data-controller="navbar">
      <div className="navbar-brand is-fullwidth">
        <a className="navbar-item" href="/">
          <i className="mr-2 fa fa-heart"></i>
          Preview
        </a>
        <a role="button"
           className="navbar-burger"
           aria-label="menu"
           data-action="click->navbar#toggleModalFullscreenMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="#">
            <span className="mr-1 icon has-text-primary">
              <i className="fa fa-heart"></i>
            </span>
            Fake Menu
          </a>
        </div>

        <div className="navbar-end">
        </div>
      </div>
    </nav>;
  }
}
