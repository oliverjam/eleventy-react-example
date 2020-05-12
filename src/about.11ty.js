const React = require("react");
const html = require("htm").bind(React.createElement);

exports.data = {
  layout: "layouts/main.11ty.js",
  title: "About me",
};

exports.render = (data) => {
  return html`<p>Imagine some content here.</p>`;
};
