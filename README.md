# Gatsby Starter MLABS
A Gatsby Starter we use here at Merchant Labs

**DISCLAIMER: THESE DOCS ARE A WORK IN PROGRESS** 😁

## Table of Contents
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [SEO](#seo)
- [Using SVGs](#using-svgs)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Image Optimization](#image-optimization)
- [Other Features](#other-features)

## Getting Started
Start using this starter (assuming Gatsby is installed) by running from your CLI:
```bash
gatsby new <repo-name> https://github.com/merchantlabs/gatsby-starter-mlabs
```

*Site Configuration* update things like site name, logo, url, etc in `data/site-config.js`

## Folder Structure
For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/)

## SEO
*The SEO component is a work in progress and hasn't been tested to make sure it is working right yet.*
Use the SEO component in `src/components`


## Using SVGs
Simply put any svg icons you want to use in `src/icons` and then ues them as a normal React component anywhere in your project.

## API Endpoints
Uses Netlify functions which are currently in [beta](https://functions-beta--www.netlify.com/docs/lambda-functions/).

## Deployment
Project is all set-up to deploy using [Netlify](https://www.netlify.com/).

## Content Management
Allow your client to modify their own content with [Netlify CMS](https://www.netlifycms.org/).
#### How images work with our configuration of Netlify CMS:
It turns out that with Gatsby and Netlify CMS the way images are stored and referenced don't work too well together. This [GitHub issue](https://github.com/netlify/netlify-cms/issues/325) explains more. Our current workaround is not optimal but it works for our use cases. Here are the assumptions you have to remember when working with images in this starter:
1. The image components can take an image prop which can either be a string the references an image or a ImageSharp object with at least the **sizes.srcSet** property. See the **ImageLoader** component for an example.
2. The image locations set in the **config.yml** file for Netlify CMS looks like
```yaml
media_folder: src/images
public_folder: images
```
3. During the build process all of the source images found in `src/images` are copied over to an `images` folder in the public directory during the build process. In this starter you will find the follow code in the **gatsby-node.js** which takes care of this.
```js
exports.onPostBootstrap = () => {
  fs.copy('src/images', 'public/images')
    .catch(() => console.log('error copying files'))
}
```
4. Images are not editable through the CMS interface, make sure the widget on all images in **config.yml** is set to *hidden*.
5. All references to images in markdown files should be relative paths from the cwd to image location. This allows gatsby-transformer-sharp to turn these strings into ImageSharp objects.


## Other Features
- [Styled Components](https://www.styled-components.com/docs)
- JS and CSS linting with [stylelint](https://stylelint.io/) and [eslint](https://eslint.org/)
