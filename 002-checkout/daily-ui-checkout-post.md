---
page_id: react-daily-ui-002
series: react-daily-ui
permalink: 002-checkout
title: React Daily UI - 002 Checkout 
description: 
published: false
authors: [ 'sophia', 'jack' ]
hero_image: /assets/images/articles/react-daily-ui/002/react-daily-ui-checkout-hero.jpg
main_image: /assets/images/articles/react-daily-ui/002/react-daily-ui-checkout-hero.jpg
codeRoot: '__FILE_PATH__'
imagesDir: '../../../assets/images/series/react-daily-ui/002'
autotoc: true
fileMetaKeyHeadingsAllowed: true
---

> This post is a part of the React Daily UI post series, a joint effort between [Jack Oliver](http://www.jackoliver.info/), [Sophia Shoemaker](https://twitter.com/wisecobbler), and the rest of the team at [Fullstack React](https://www.fullstackreact.com/).
> Each day we're explaining in detail how to create a UI component with React.
>
> You can view [the Codepen implementation here](https://codepen.io/jackoliver/pen/qNwrrp)
> 
> Or you view the code [on Github here](https://github.com/fullstackreact/react-daily-ui)

Welcome to React Daily UI, where we go 100 days building 100 beautiful React applications. We're really excited to be partnering with [Jack Oliver](http://www.jackoliver.info/) who is embarking on this ambitious project with us. 

Jack is designing and writing the code for these applications and we're going to deconstruct each one to highlight the features that are unique to React. 

Today we're going to explore another form, a checkout form:

<iframe height='702' scrolling='no' src='//codepen.io/jackoliver/embed/XKQxvy/?height=702&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/XKQxvy/'>React Daily UI - 002 - Checkout</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## Overview

The checkout form for this daily UI is similar to [our last form](/react-daily-ui/001-sign-up-form/), but it has a few extra goodies we're going to explore today. Here are the topics we're going to cover:

*  Javascript Modules in ES6 
*  `import` and `export` statements
*  Using `this.props` and `this.state` to modify data
*  Stateless Functional Components
*  Importing an external library and using it in our code

## Table of Contents

<!-- toc -->
<!-- tocstop -->

<div class="newsletter-cta">
  <div class="row">
      <div class="col-xs-12 col-lg-12 col-md-12">
    <div class="action">
      <img src="/assets/images/features/icon2_dolphin.png" alt="" height="170" class="icon">
      <h2 id="stay-up-to-date-with-react"><a class="headingAnchor" href="#stay-up-to-date-with-react"><span></span></a><strong><i>Want to be a pro at building UIs in React?</i></strong></h2>
      <p>
        This post is one of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed.
      </p>
      <div class="form-container">
        <form action="//ng-newsletter.us6.list-manage.com/subscribe/post?u=86d6f14c7cc955128485e3b8e&amp;id=2877dfe707" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form-inline" target="_blank" novalidate>
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">Email address</label>
            <input type="email" class="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter email">
            <input type="hidden" name="FORMID" value="DailyUI-002-a">
          </div>
          <input type="checkbox" id="group_1" name="group[9][1]" value="1" class="av-checkbox" checked style="display:none">
          <div style="position: absolute; left: -5000px;"><input type="text" name="b_86d6f14c7cc955128485e3b8e_2877dfe707" tabindex="-1" value=""></div>
          <button type="submit" id="mc-embedded-subscribe" class="btn btn-success btn-xs" href="">
            <i class="glyphicon glyphicon-envelope"></i>
            SEND ME REACT TIPS
          </button>
        </form>
        <div class="help">
          No spam ever &amp; it's easy to unsubscribe.
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

## JavaScript Modules

In Jack's CodePen example, all the code for our application is in one file. While this is great for simple applications, as a codebase gets larger, it's important to split the code out into separate files or "modules", for maintainability and readability.  

> ## What is a module?
> 
> A module is a JavaScript file that contains functions, objects and classes. Although it is just a JavaScript file, 
> there are some differences in the way we use a module compared to how you would normally a JavaScript file being 
> used. We don't necessarily include this file in a `script` tag like we would normally using JavaScript in a web page. Most modules are bundled together using a module bundler such as Webpack, Browserify or RequireJS which bundles all the necessary files and generates a final JavaScript file to be put included in a `script` tag. See this [in depth guide on modules](http://
> exploringjs.com/es6/ch_modules.html) and how they are used.

In JavaScript, top level variables are in the global scope, which create challenges. If every part of an application can access and modify data that shouldn't be accessed, unintended consequences can occur and make debugging difficult. Using modules allows us to create variables that are local to the module and do not pollute the global namespace. 

There are different implementations of JavaScript modules and methods for using them. [Preethi Kasireddy has a great article explaining all the different module implementations](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc). 

The latest version of JavaScript, EcmaScript 6 (or ES6, for short) is the first time that the JavaScript language has built-in modules. Since ES6 is the next generation of JavaScript, we're going to use the syntax and techniques for ES6 modules. Let's explore how we use ES6 modules in our code.

## `import` and `export` with ES6

In order to use ES6 modules in JavaScript, there are two important keywords to know and learn: `export` and `import`. These two keywords allow us to use and reuse code across mutiple files and codebases. Let's first explore what it means to `export` something in JavaScript and then we'll learn how to `import` those things that we've exported.

### `export` 

When we use the `export` keyword in JavaScript, we are exposing the variables and functions in a module to anything that imports it (we'll take a look at importing next). We can export any variable (declared with `var`, `let` or `const`), function or class. There are two different ways to export in ES6:

*  In our `src/components/CheckoutArea/PaymentFormComponents.js` file we have multiple components we'd like to expose to other modules. The syntax for exporting these multiple components looks like this:

{lang=javascript,crop-query=after(.BasicInput, .BasicInput)}
<<[](src/components/CheckoutArea/PaymentFormComponents.js)

By wrapping the function names in curly braces, we are telling our environment we want this collection of items to be available to any module that imports it.

*  Another approach is to import just a single value. If we want to do this, we'll need to add the `default` keyword to our export:

{lang=javascript,crop-query=after(.Checkout, .Checkout)}
<<[](src/components/CheckoutArea/Checkout.js)

This tells the environment that the object that should be exported from the module is the `Checkout` variable and it's associated data is available without needing to specify the exact names of properties we are exporting.

### `import`

Now that we know how to `export`, let's look at how to use this information in another module. This is where the `import` keyword comes in.

There are a few different ways to `import` a module. We'll look at each different variation, explain how it works and show an example in our codebase of how it's used. 

*  The most common way to `import` another module is to import the default export of a module. We see this frequently used in React codebases like this:

{lang=javascript,crop-query=.React}
<<[](src/App.js)

*  Another way to `import` another module is to use the curly braces (similar to how we used them for exporting):

{lang=javascript,crop-query=.PaymentForm}
<<[](src/components/CheckoutArea/Checkout.js)

The curly braces around the name of the component we are importing indicates that we want to import that explicitly named export. This is different than the previous example where we were importing the default export.

*  One other way to `import` a module is by using `*`. This says we want to import all the exported values from a module. It is not recommended unless you know exactly what a module contains: 

{lang=javascript,crop-query=.Workspace}
<<[](src/components/ImagePreviewArea/ImagePreview.js)

In [our form from the previous post](/react-daily-ui/001-sign-up-form/), we had all of our code in one file. Since our checkout form has significantly more components, we are going to split our code out into several folders and files and use the `import` and `export` keywords we just learned. 

Here's a snapshot of our file structure in [the Github repository](https://github.com/fullstackreact/react-daily-ui):

<img src="{{ imagesDir }}/filestructure.png" style="width:inherit"/>

It's helpful to split out components by areas of functionality. Our checkout form has three distinct areas and within those three areas our code is broken down into several components:

<img src="{{ imagesDir }}/002-checkout-component-breakdown.jpg" />

In the upper left-hand corner we have a slider (the purple rectangle) which controls the number of days a user can rent the co-working space. In the main section of our application on the left-hand side (the red rectangle), we have an image and some text describing the space (the two blue rectangles). On the right-hand side (the dark purple rectangle) we have a breakdown of the cost, which we will call the "order summary" (the green rectangle). The data in this section changes when we move the slider in the upper left-hand corner. The right-hand side also has the form where the user submits payment information (the brown rectangle). 

Let's take a look at the code for a few of our files:

### `src/App.js`

Our App.js file is the main file for our application. This is the parent component that renders all the child components for our application. 

At the top of the `App.js` file, let's import two files we'll use which contain the logic for the left and right hand side of the main part of our application, the `ImagePreview.js` and `Checkout.js` files using the ES6 `import`:

{lang=javascript,crop-query=.ImagePreview-.Checkout}
<<[](src/App.js)

In the render function of our `App.js` file, we'll use two child components:

*  An `Overlay` component which contains the background image for our application

{lang=javascript,crop-query=window(.App .render,4,6)}
<<[](src/App.js)

*  A `Container` component which contains the two imported child components --  `ImagePreview` and `Checkout`.

{lang=javascript,crop-query=window(.App .render,7,12)}
<<[](src/App.js)

These child components are wrapped in the `ReactCSSTransitionsGroup` components:

{lang=javascript,crop-query=window(.App .render,16,22)}
<<[](src/App.js)

If you'd like to learn more about how those components work, you can read [the section from our previous post](#) on how we use `ReactCSSTransitionGroup` with our components.

We'll also use the `import` statement in our two child components `ImagePreview` and `Checkout`. 

### `src/components/ImagePreviewArea/ImagePreview.js`

In the `ImagePreview.js` file, we'll import everything that is exported from the file in `src/components/ImagePreviewArea/WorkspaceComponents.js` and refer to the object as `Workspace`:  

{lang=javascript,crop-query=1-3}
<<[](src/components/ImagePreviewArea/ImagePreview.js)

When we  want to use an object, function or component from the `WorkspaceComponents.js` file, we'll use it with the dot (`.`) operator, like this:

{lang=javascript,crop-query=window(.ImagePreview .render,4,5),undent=true}
<<[](src/components/ImagePreviewArea/ImagePreview.js)

Finally, the last line of code in our `ImagePreview.js` file is the line where we `export` the variables from our file. In this case, we are exporting the `ImagePreview` variable which is a React component:

{lang=javascript,crop-query=16-16}
<<[](src/components/ImagePreviewArea/ImagePreview.js)

### `src/components/CheckoutArea/Checkout.js`
In our `Checkout.js` file we are importing two files, `OrderSummary.js` and `PaymentForm.js`: 

{lang=javascript,crop-query=2-3}
<<[](src/components/CheckoutArea/Checkout.js)

The `PaymentForm.js` file contains the form we need for the payment form and the `OrderSummary.js` file contains the cost breakdown of our order. We'll discuss how the data for this file changes in the next section. 

## Manipulating data with `this.setState()` and `this.props`

In our checkout application we have a slider in the upper left hand corner of our application which modifies data in the order summary section. When a user moves the slider, the number of days in the order summary section changes.

In order for the days value to change, we need to change the state of our application. React components have a `state` property which [we discussed in our previous post](/react-daily-ui/001-sign-up-form/#what-is-state). 

We define the initial state values of the component's data by defining the `getInitialState()` method of a React component. This method returns an object that contains the initial state of our application. One item in our `state` object, the `duration` value is the data we are going to use to display and modify how many days a user has chosen. Let's return the initial value of this `duration` variable as `5`. 

{lang=javascript,crop-query=.App .getInitialState}
<<[](src/App.js)

Using our component's `state` coupled with a child component's `props` we can send data down to our child components and update the number of days displayed in the order summary section. 

> A child component does _not_ pass any data back up to it's parent component. This means we can only ever pass data _down_ the component tree. This pattern of data passing is called _one-way databinding_. 
>
> A child component _can_ inform the parent component about an update it makes, but cannot change the data itself. In order to inform the parent component that a change has happened, we'll need pass down a function as a prop.

The difference between `props` and `state` can be somewhat confusing. `props` are used to pass down data and event handlers from parent components to child components. `state` on the other hand is used to manipulate the current state of a component. 

In our `src/App.js` file, we've defined a `<Header>` component which contains our input slider. We create an instance of this component as a child of our main `App` component:

{lang=javascript,crop-query=window(.App .render,23,23),undent=true}
<<[](src/App.js)

This `<Header>` component has a property called `onChange`. The value of this property is the `handleChange` function in our `src/App.js` file. 

Our `input` element is defined in the `render` function of our `Header` component:

{lang=javascript,crop-query=.Header}
<<[](src/App.js)

When a user moves the slider, the onChange event is triggered for the input element and the callback function we've passed down as a `prop` -- `this.props.onChange` is called.

The code for this callback function lives in our `App` component (in `src/App.js`) and contains a call to `this.setState`. This function call causes the state of our application to change. In this particular call, we are changing the value of `duration` to be the value from the slider input: 

{lang=javascript,crop-query=.handleChange,undent=true}
<<[](src/App.js)

In order to pass down the `duration` value when the user changes the slider, we're going to send the data to our `Checkout` component via `props`, similar to how we passed down a function via `props` with our `Header` component. Our `Checkout` component has a property called `duration` and we give it the value contained in our `App` component's `this.state.duration`.

{lang=javascript,crop-query=choose(.App .container,1),undent=true}
<<[](src/App.js)

Our `src/components/CheckoutArea/Checkout.js` file has an `OrderSummary` component that also has a property called `duration`. We will pass our `Checkout` component's value found in `this.props.duration` to the `OrderSummary` component's `duration` property where it will get used to display the number of days a user selects and calculate the final amount based on the cost per day.

{lang=javascript,crop-query=.render,undent=true}
<<[](src/components/CheckoutArea/Checkout.js)


## Stateless Functional Components 

Some of our components only change when the parent component gives it new data. The component itself doesn't require the use of `this.state` to make modifications to it's own state. When this is the case it's beneficial to use stateless functional components.

> ## What is a stateless functional component?
> A stateless function component is a component that does not have certain attributes of React components. Three main features distinguish these components:
> 
> * It does not have a backing instance which means it does not maintain a reference to an actual DOM node
> 
> * It does not have lifecycle methods
> 
> * It does not have an internal state (no references to `this.state` or using `this.setState`)   
> 
> 
> See the [React docs on stateless functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) for more information.

Using stateless functional components will allow the React algorithm in the future to optimize rendering and memory allocation. 

A stateless functional component does not make use of the `React.createClass` method that is commonly used to create a component. A stateless functional component is just a regular JavaScript function that has a `props` as a parameter. We'll uses these `props` just like we would use them in a regular component. React expects us to return a JSX component value from this function, just like what we'd return from a component's `render` function. 

Put another way, the stateless function component is useful when a component just has a `render` function and doesn't need to compute or modify any data.

Let's take a look at an example from the code that uses this pattern:

{lang=javascript,crop-query=(.Information)}
<<[](src/components/ImagePreviewArea/WorkspaceComponents.js)

This `Information` function has a `props` parameter and we use that props object to display information coming from our parent component. Looking through our modules, you'll find most of our components can be made into stateless functional components, since most of them meet the criteria for stateless functional components. 

## Using the `pluralize` library 

There are multiple places in our code where we need to display the plural form of a word. Instead of writing the same code in multiple places, or even creating a function that we can use, there is a library -- [pluralize](https://github.com/blakeembrey/pluralize) -- that will modify our text to have the plural form if we need to. This library has done the heavy lifting for us of determining how to pluralize a word. We can leverage [plurarlize](https://github.com/blakeembrey/pluralize) in our application.

In order to use pluralize we'll need to first install it via `npm`:

> 
> ```bash
> npm install pluralize --save
> ```

Then we can use the function pluralize provides in our application:

{lang=javascript,crop-query=(.Information)}
<<[](src/components/ImagePreviewArea/WorkspaceComponents.js)

## Try it out!

Check out the Codepen example:

<iframe height='702' scrolling='no' src='//codepen.io/jackoliver/embed/XKQxvy/?height=702&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/XKQxvy/'>React Daily UI - 002 - Checkout</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

> The complete source for this article is also available [on Github here](https://github.com/fullstackreact/react-daily-ui).
>
> To start the app, download the code, `cd` into the project directory and type:
>
>        npm install
>        npm start
>

<div class="newsletter-cta">
  <div class="row">
      <div class="col-xs-12 col-lg-12 col-md-12">
    <div class="action">
      <img src="/assets/images/features/icon2_dolphin.png" alt="" height="170" class="icon">
      <h2 id="stay-up-to-date-with-react"><a class="headingAnchor" href="#stay-up-to-date-with-react"><span></span></a><strong><i>Be notified of new posts</i></strong></h2>
      <p>
        This post is the first of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed.
      </p>
      <div class="form-container">
        <form action="//ng-newsletter.us6.list-manage.com/subscribe/post?u=86d6f14c7cc955128485e3b8e&amp;id=2877dfe707" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form-inline" target="_blank" novalidate>
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">Email address</label>
            <input type="email" class="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter email">
            <input type="hidden" name="FORMID" value="DailyUI-002-b">
          </div>
          <input type="checkbox" id="group_1" name="group[9][1]" value="1" class="av-checkbox" checked style="display:none">
          <div style="position: absolute; left: -5000px;"><input type="text" name="b_86d6f14c7cc955128485e3b8e_2877dfe707" tabindex="-1" value=""></div>
          <button type="submit" id="mc-embedded-subscribe" class="btn btn-success btn-xs" href="">
            <i class="glyphicon glyphicon-envelope"></i>
            SEND ME REACT TIPS
          </button>
        </form>
        <div class="help">
          No spam ever &amp; it's easy to unsubscribe.
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
