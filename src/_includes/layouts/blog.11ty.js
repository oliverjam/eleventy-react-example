const React = require("react");
const html = require("htm").bind(React.createElement);

exports.data = {
  layout: "layouts/main.11ty.js",
};

exports.render = (data) => {
  return html`
    <div
      className="content"
      dangerouslySetInnerHTML=${{ __html: data.content }}
    />
  `;
};
