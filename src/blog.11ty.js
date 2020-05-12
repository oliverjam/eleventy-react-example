const React = require("react");
const html = require("htm").bind(React.createElement);

exports.data = {
  layout: "layouts/main.11ty.js",
  title: "My blog",
  eleventyComputed: {
    // the top-level template will output a <link rel="prefetch">
    // for each url in this array (here the first 3 blog posts)
    // so navigating to them should be ~instant
    prefetch: (data) => data.collections.blog.slice(-3).map((b) => b.url),
  },
};

exports.render = (data) => {
  const posts = data.collections.blog;
  return html`
    <ul>
      ${posts.map(
        (post) =>
          html`<li key="${post.url}">
            <a href="${post.url}">${post.data.title}</a>
          </li>`
      )}
    </ul>
  `;
};
