import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

// import '../sass/project.scss';

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// blong: Comment here...
// From: https://discourse.stimulusjs.org/t/call-stimulus-function-from-google-maps-callback/191
// window.dispatchMapsEvent = function(...args) {
//   const event = document.createEvent("Events");
//   event.initEvent("google-maps-callback", true, true);
//   event.args = args;
//   window.dispatchEvent(event);
// };
