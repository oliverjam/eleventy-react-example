const ReactDOMServer = require("react-dom/server");

// this is the top-level layout used by all other layouts
// it is unique in that this is the only place we render React elements to a string
// all other templates/layouts return React element objects
// these build up into a React tree, which is finally converted to an HTML string here

// we can't use React to render the final top-level layout
// unfortunately it shits the bed on the <!doctype html>

const html = String.raw;
const template = ({ title, prefetch, content }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <link rel="prefetch" href="/blog/" />
      <link rel="prefetch" href="/about/" />
      ${prefetch
        ? prefetch.map((url) => html`<link rel="prefetch" href="${url}" />`)
        : ""}
    </head>
    <body>
      ${content}
    </body>
  </html>
`;

exports.render = (data) => {
  // render the child content React elements to an HTML string
  const content = ReactDOMServer.renderToStaticMarkup(data.content);
  // wrap the child HTML in the top-level page layout
  return template({ content, title: data.title, prefetch: data.prefetch });
};
