# Eleventy with React

This is an example showing how you can use React as a static templating engine with the Eleventy static site generator.

React is only used to compose components and render to static HTML—there is no client-side JavaScript at all. You can see the final built files in the `_site/` directory.

## Run locally

1. Clone this repo
1. Run `npm install`
1. Run `npm run dev`

## How Eleventy works

Eleventy supports a ton of different templating languages (Nunjuks, Handlebars, Liquid etc). I prefer to use "JavaScript templates". These are JS files whose filenames end in `.11ty.js`. This tells Eleventy to render that JS file as a template (rather than treating it as standard JS). Eleventy will render an HTML page for each template file.

JS Templates have to export a `render` function. Eleventy will run this function and either render the result directly or pass the result on to whatever "layout" you specify for the template. The layout is like a wrapper for the template that can provide the surrounding HTML (e.g. shared navigation, footer etc). You can specify this layout (and other data for the template) by exporting a `data` object.

## How React fits in

Our template's `render` functions return React elements. It turns out Eleventy doesn't care what templates return, it just renders the eventual end result (after passing through layouts) to an HTML file.

Note we're using [`htm`](https://github.com/developit/htm) to create React elements, since I didn't want to bother setting Babel up to transpile JSX.

This means as long as we have a final layout at the top of the chain which renders the tree of React elements to an HTML string everything works fine.

We do this in `src/_includes/layouts/render.11ty.js` using `ReactDOMServer.renderToStaticMarkup`. We also have to use a regular template literal to wrap the React tree in all the usual HTML boilerplate, since React breaks if you try to render a `<!doctype html>`.

## Bonus pre-fetching

People sometimes argue that static sites that use React client-side perform better because a single-page app with client-side routing downloads all the content upfront and can therefore navigate instantly between pages.

Ignoring the fact that trading off upfront performance might not be the best idea, we can achieve something similar without any JS at all.

[Almost all browsers support](https://caniuse.com/#feat=link-rel-prefetch) pre-fetching resources declaratively using `<link re="prefetch" href="/some-page/">`. Including this in the `<head>` of a document will cause the browser to fetch `/some-page/` and keep it in the cache. If the user clicks a link for that resource it should load almost instantly.

Here we're using this technique to pre-fetch all the top-level pages (`/about/` and `/blog/`). We also use the new Eleventy "computed data" feature to specify the most recent 3 blog posts to be pre-fetched on the `/blog/` page, so the user can instantly view them.
