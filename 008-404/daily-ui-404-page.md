---
page_id: react-daily-ui-008
series: react-daily-ui
permalink: 008-404-page
title: React Daily UI - 008 Creating a 404 Page with React Router
description: 
published: true
draft: false
date: 'Thurs Apr 06 2017 08:53:00 GMT-0700 (PDT)'
authors: [ 'sophia', 'jack' ]
hero_image: /assets/images/series/react-daily-ui/008/react-daily-ui-008.jpg
main_image: /assets/images/series/react-daily-ui/008/react-daily-ui-008.jpg
codeRoot: '__FILE_PATH__'
imagesDir: '../../../assets/images/series/react-daily-ui/008'
autotoc: true
fileMetaKeyHeadingsAllowed: true
---

> This post is a part of the React Daily UI post series, a joint effort between [Jack Oliver](http://www.jackoliver.info/), [Sophia Shoemaker](https://twitter.com/wisecobbler), and the rest of the team at [Fullstack React](https://www.fullstackreact.com/).
> Each day we're explaining in detail how to create a UI component with React.
>
> You can view [the Codepen implementation here](http://codepen.io/jackoliver/pen/zBQAWo)
> 
> Or you view the code [on Github here](https://github.com/fullstackreact/react-daily-ui)


Welcome to React Daily UI, where every day is opportunity to learn how to build beautiful React applications. We're really excited to be partnering with [Jack Oliver](http://www.jackoliver.info/) who is embarking on this ambitious project with us. 

Jack is designing and writing the code for these applications and we're going to deconstruct each one to highlight the features that are unique to React. 

Today we're going to learn how to use React Router v4 and include a 404 page for our website:

<iframe height='380' scrolling='no' title='React DailyUI - 008 - 404' src='//codepen.io/jackoliver/embed/XKvWAV/?height=380&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/XKvWAV/'>React DailyUI - 008 - 404</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## Overview
Today we're going to make a simple website. The website we are going to build deviates slightly from Jack Oliver's original implementation on CodePen so we can highlight some of the features of the latest version of React Router. We are going to learn about version 4 of React Router which is a different approach to how the router works compared to earlier versions. [The documentation for React Router v4](https://reacttraining.com/react-router/) is a really great resource and highly recommended for getting started with React Router v4.

## Table of Contents

<!-- toc -->
<!-- tocstop -->

<!--template 
    path="src/layouts/partials/ctas/dashed_email_input_cta.html" 
    heading="Want to be a pro at building UIs in React?"
    body="This post is the first of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed."
    cta="NOTIFY ME"
    formId="DailyUI-008-a"
    formAction="https://fd338.infusionsoft.com/app/form/process/0a407f636d37a2d3606fe5d63dc0ce31"
    infFormXid="0a407f636d37a2d3606fe5d63dc0ce31"
    infFormName="Daily UI Form Submitted"
    -->

## Source code structure

First, we're going to create three pages for our site: the home page, an "about us" page and our "404" page. All of the pages for our website will be in the `pages` folder (which lives inside the `src` folder). Each page will have a JavaScript file. If there are any other associated assets with that page, such as a CSS file or images, the JavaScript file and the corresponding assets will all be put in a folder.  

Our website has two JavaScript files in our `pages` folder: `Home.js` and `About.js` and a `NotFound` folder which contains the JavaScript and CSS for the 404 page.

<img class="centered" style="width:55%" src="/assets/images/series/react-daily-ui/008/filestructure.png"/>

### The  `Home` and `About` components
Our `Home` and `About` components are very simple function components that return the title of the page with no other content.

{lang=javascript,crop-query=(.Home),undent=true}
<<[](src/pages/Home.js)

{lang=javascript,crop-query=(.About),undent=true}
<<[](src/pages/About.js)

### The `NotFound` component
Our `NotFound` component has some slightly different styling which includes a `gif` for a background image.

{lang=javascript,crop-query=(.NotFound),undent=true}
<<[](src/pages/NotFound/NotFound.js)

Here is the CSS code for it:

```
.page-container .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  mix-blend-mode: overlay;
}
``` 

## Set up React Router
To set up React Router we need to first install the latest version for the web:

`npm install react-router-dom`

Then we need to `import` the components we'll need to use React Router in our website.

The components we are going to need are:

* `BrowserRouter`
* `NavLink`
* `Route`
* `Switch`
* `Redirect`

We'll import all these components in the top of our `index.js` file like so:
{lang=javascript,crop-query=context(.BrowserRouter,1,5),undent=true}
<<[](src/index.js)

Now that we've imported all the components we need, let's use them to create our website.

### `BrowserRouter`

If you look at our `index.js` file, we have wrapped our entire application in a `BrowserRouter` component. The `BrowserRouter` component is the "meat & potatoes" of using React Router. The `BrowserRouter` component inherits from a core `Router` component and makes it possible to include routing in our React web applications. 

### `NavLink`

Inside our `BrowserRouter` component we have the navigation area of our page which contains links to the various pages of our site. We are going to use the `NavLink` component for our links. The `NavLink` component automatically adds the `active` class to the rendered `a` element when the current URL matches the `to` path in our `NavLink` component. 
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),4,11),undent=true}
<<[](src/index.js)

### `Route`

Below the navigation section of our page is where all the React Router magic actually happens!

We use two React Router components, `Route` &amp; `Switch` to determine which page the user will actually see when they click on a link in our navigation. We wrap `Route` components inside a `Switch` component, but before we get to the purpose of the `Switch` component, let's first understand how to use the `Route` component because the it is one of the most crucial pieces of using React Router.

In our website we have 3 `Route` components and each one has a few features that make it different from the others. All of our `Route` contain `props` that will determine when and how we want our pages to be displayed. Each `Route` uses the `component` prop to specify which component we want rendered. 

The first `Route` renders our `Home` component and also uses the following `props`: 

1. `path`: This prop specifies which path we want to match. In the case of the home page we want the `Home` component to render when the user browsers to `/`
2. `exact`: This prop indicates that we only want to render when the path matches exactly. This is important for the `/` path. If we did not specify `exact`, when the user typed in any URL to browse our website, the `Home` component would render every time, regardless of the path since every path in our website contains `/` (`/about` &amp; `/about-us`).
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),14,14),undent=true}
<<[](src/index.js)

The second `Route` renders our About page and contains the `path` prop as well. This `Route` does not use the `exact` prop -- any path that contains `/about` will render the About page
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),16,16),undent=true}
<<[](src/index.js)

Finally, our third `Route` is our 404 page. This `Route` component does not contain the `path` prop, so it will always render.
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),17,17),undent=true}
<<[](src/index.js)

### `Redirect`
Within our `Switch` component we also have one more type of component, a `Redirect` component. This component allows us to set up redirects. For our website, we want to make sure that if the user browsers to `/about-us` we redirect them to the correct URL, `/about`, so we'll add this `Redirect` component to make sure that happens.
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),15,15),undent=true}
<<[](src/index.js)

### `Switch`

All of our `Route` components and our `Redirect` component are contained within a `Switch` component. By default, a `Route` will render a component if the all the requirements for a `Route` are met. For example, if we did not wrap our three `Route` components in a `Switch` component, and the user browsed to the `/about` URL, the `About` component and our `404` component would both render on the page. Wrapping our `Route` components in a `Switch` tells our router that we only want to render the first "match" it finds. So placing our "404" `Route` as the last route ensures that if there are no matches, the 404 page will be displayed (and only the 404 page).
{lang=javascript,crop-query=window(choose(.ReactDOM, 1),13,18),undent=true}
<<[](src/index.js)


## Try it out!

Check out the Codepen example:

<iframe height='380' scrolling='no' title='React DailyUI - 008 - 404' src='//codepen.io/jackoliver/embed/XKvWAV/?height=380&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/XKvWAV/'>React DailyUI - 008 - 404</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

> The complete source for this article is also available [on Github here](https://github.com/fullstackreact/react-daily-ui).
>
> To start the app, download the code, `cd` into the project directory and type:
>
>        npm install
>        npm start
>

<!--template 
    path="src/layouts/partials/ctas/dashed_email_input_cta.html" 
    heading="Want to be a pro at building UIs in React?"
    body="This post is the first of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed."
    cta="NOTIFY ME"
    formId="DailyUI-008-b"
    formAction="https://fd338.infusionsoft.com/app/form/process/0a407f636d37a2d3606fe5d63dc0ce31"
    infFormXid="0a407f636d37a2d3606fe5d63dc0ce31"
    infFormName="Daily UI Form Submitted"
    -->
