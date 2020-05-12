const React = require("react");
const html = require("htm").bind(React.createElement);

function Title({ as: Tag = "h1", style, ...rest }) {
  return html`
    <${Tag}
      style="${{
        fontWeight: 900,
        color: "hsl(180, 10%, 25%)",
        ...style,
      }}"
      ...${rest}
    />
  `;
}

module.exports = Title;
