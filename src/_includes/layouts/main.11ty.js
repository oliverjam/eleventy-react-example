const React = require("react");
const html = require("htm").bind(React.createElement);

const Title = require("../components/title");

exports.data = {
  layout: "layouts/render.11ty.js",
};

exports.render = (data) => {
  return html`
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <${Title}>${data.title}</${Title}>
      ${data.content}
    </main>
  `;
};
