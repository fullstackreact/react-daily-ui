---
page_id: react-daily-ui-006
series: react-daily-ui
permalink: 006-profile-page
title: React Daily UI - 006 Profile Page
description: 
published: false
draft: true
authors: [ 'sophia', 'jack' ]
hero_image: /series/react-daily-ui/005/react-daily-ui-006-app-icon.jpg
main_image: /series/react-daily-ui/005/react-daily-ui-006-app-icon.jpg
codeRoot: '__FILE_PATH__'
imagesDir: '../../../assets/images/series/react-daily-ui/006'
autotoc: true
fileMetaKeyHeadingsAllowed: true
---

> This post is a part of the React Daily UI post series, a joint effort between [Jack Oliver](http://www.jackoliver.info/), [Sophia Shoemaker](https://twitter.com/wisecobbler), and the rest of the team at [Fullstack React](https://www.fullstackreact.com/).
> Each day we're explaining in detail how to create a UI component with React.
>
> You can view [the Codepen implementation here](http://codepen.io/jackoliver/pen/zBQAWo)
> 
> Or you view the code [on Github here](https://github.com/fullstackreact/react-daily-ui)


Welcome to React Daily UI, where we go 100 days building 100 beautiful React applications. We're really excited to be partnering with [Jack Oliver](http://www.jackoliver.info/) who is embarking on this ambitious project with us. 

Jack is designing and writing the code for these applications and we're going to deconstruct each one to highlight the features that are unique to React. 

Today we're going to create a profile page:

<iframe height='420' scrolling='no' title='React DailyUI - 006 - User Profile' src='//codepen.io/jackoliver/embed/rLExbO/?height=420&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/rLExbO/'>React DailyUI - 006 - User Profile</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## Overview

This profile page has a few components that are generated using the `createClass` method available in React. Today we are going to learn how to convert these components into functional and class components. We have three different components that we are going to convert:

* An `Image` component 
* A `Profile` component
* An `App` component

We will convert the first two components to functional components and the `App` component to a class component.

## Table of Contents

<!-- toc -->
<!-- tocstop -->

<!--template 
    path="src/layouts/partials/ctas/dashed_email_input_cta.html" 
    heading="Want to be a pro at building UIs in React?"
    body="This post is the first of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed."
    cta="NOTIFY ME"
    formId="DailyUI-006-a"
    formAction="https://fd338.infusionsoft.com/app/form/process/0a407f636d37a2d3606fe5d63dc0ce31"
    infFormXid="0a407f636d37a2d3606fe5d63dc0ce31"
    infFormName="Daily UI Form Submitted"
    -->

## Functional Components

Functional components are the simplest (and most performant) types of components. They are just a JavaScript function that receive `props` as a parameter. Functional components do not have `state` or a `this` object. When mounted, they receive data from their parent component and display the data. 

> Functional components are akin to React components that only implement the `render()` method. For components that only have a view, functional components are the way to go.

Our profile page has two components that we are going to convert to functional components: the `Image` component and the `Profile` component.

### Converting the `Image` component 

Our original `Image` component looks like this: 

{lang=javascript,crop-query=(.Image),undent=true}
<<[](src/AppOriginal.js)

To convert our `Image` component, we are going to do 3 things:

1. Create a new function that has the same name as our `Image` component:

{lang=javascript,crop-query=window(.Image,0,0),undent=true}
<<[](src/App.js) 


2. Take the `return` value from our `render` method in our original component and make that the `return` value of our function. 

{lang=javascript,crop-query=window(.Image .render,1,3),undent=true}
<<[](src/AppOriginal.js) 


3. If we have any `props` in our component, we need to remove the `this` keyword, since the `props` are passed in as a parameter to the function. In our `Image` component, we change `this.props.src` to `props.src`

Here is what our newly created `Image` component looks like now:

{lang=javascript,crop-query=(.Image),undent=true}
<<[](src/App.js) 

### Converting the `Profile` component

Following the same procedure above, let's convert our `Profile` component convert it to a functional component.

1. Create a function called `Profile` and give it `props` as an argument.

{lang=javascript,crop-query=window(.Profile,0,0),undent=true}
<<[](src/App.js) 

2. Take the return value from our `render` method and make that the return value of our function. 

{lang=javascript,crop-query=window(.Profile .render,2,10),undent=true}
<<[](src/AppOriginal.js) 

3. We change any references to `this.props` to `props`. In our `Profile` component we need to change `this.props` to `props` in multiple places:

+ `this.props.person.name` to `props.person.name`
+ `this.props.person.biography` to `props.person.biography`
+ `this.props.quote.content` to `props.quote.content`
+ `this.props.quote.source` to `props.quote.source`

Here is what our newly created `Profile` function component looks like: 

{lang=javascript,crop-query=(.Profile),undent=true}
<<[](src/App.js) 

## Class components

Our `App` component is a litle more complicated in terms of functionality, so we are going to convert the component to a JavaScript class. 

The JavaScript syntax for classes are new-ish as of the ES6 (also known as ES2015/ECMAScript 6/ECMAScript2015) specifications. Classes are not unique to JavaScript. Classes are a common construct used in many languages, but the "under the hood" implementation details of using the `class` keyword is different in JavaScript compared to other class-based languages, like Java or C++.

### What is a `class`?

> In the real world, there are many types of objects, all with specific functions and features. For example, a bicycle is a commonly used object that has 2 wheels, gears, handlebars, brakes and a seat. These are all common properties of a bicycle. While riding a bicycle, you might apply the brakes, shift gears or pedal. Creating a bicycle requires a blueprint to make sure it is built properly, to the correct specifications. 

> In the programming world, we also make use of "blueprints" or "templates" to build objects. These templates are called classes, and they specify the certain actions (more commonly known as methods) and properties an object has. When we create a new object using a class, we say we are "instantiating an object." We'll often refer to this object as an _instance_ of the class.

When we create components in React, we typically extend the `Component` class or "template". The `Component` class React gives us has methods associated with it (like the `setState` method) that the components we create can use in our subclassed objects.  

Objects, classes and prototypes are a fairly complex, but important topic to learn in JavaScript. If you'd like to go more in depth, these blog posts are highly recommended for learning more:

["Understanding Prototypes in JavaScript"](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/) by Yehuda Katz

["How to Use Classes and Sleep at Night"](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4#.qnl0bzw66) by Dan Abramov

["What’s the Difference Between Class & Prototypal Inheritance?"](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9#.p33n6s8w7) by Eric Elliott

### Converting the `App` component

To convert our `App` component, we need to do a few things. 

1. First, we import the `Component` class from React using this syntax:

{lang=javascript,crop-query=window(.React,0,0),undent=true}
<<[](src/AppOriginal.js) 

2. Next, we change our code from using `React.createClass` to using the JavaScript `class` syntax:

The first line of our old `App` component looks like this:

{lang=javascript,crop-query=window(.App,0,0),undent=true}
<<[](src/AppOriginal.js) 

We need to remove the `React.creacteClass` function call and replace it with the `class` keyword. We also need to extend the `Component` class:

{lang=javascript,crop-query=window(.App,0,0),undent=true}
<<[](src/App.js) 

2. Then, we create a constructor function and pass in `props` so that our component has access to any `props` passed into it. 

{lang=javascript,crop-query=window(.App .constructor,0,0),undent=true}
<<[](src/App.js) 

Inside our constructor function we _must first_ call `super(props)` in this syntax. Calling `super()` calls the React.Component `constructor` function. In derived classes, `super()` must be called before we can use `this`. Leaving `super()` out will cause a reference error. 

{lang=javascript,crop-query=window(.App .constructor,1,1),undent=true}
<<[](src/App.js)

3. Next, we need to initialize the state of our component. Instead of using the `getInitialState` function, we will initialize the state of our component in our constructor function. We can take the object returned from our `getInitialState` function and assign it to `this.state` in our constructor:

{lang=javascript,crop-query=window(.App .constructor,2,12),undent=true}
<<[](src/App.js) 

4. Finally, we'll need to change the syntax of our `render` function slightly to look like this:

{lang=javascript,crop-query=(.App .render),undent=true}
<<[](src/App.js)

Here is the full result of our new `App` component:

{lang=javascript,crop-query=(.App),undent=true}
<<[](src/App.js) 

## Try it out!

Check out the Codepen example:

<iframe height='420' scrolling='no' title='React DailyUI - 006 - User Profile' src='//codepen.io/jackoliver/embed/rLExbO/?height=420&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/rLExbO/'>React DailyUI - 006 - User Profile</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
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
    formId="DailyUI-006-b"
    formAction="https://fd338.infusionsoft.com/app/form/process/0a407f636d37a2d3606fe5d63dc0ce31"
    infFormXid="0a407f636d37a2d3606fe5d63dc0ce31"
    infFormName="Daily UI Form Submitted"
    -->
