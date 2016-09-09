---
page_id: react-daily-ui-001
series: react-daily-ui
permalink: 001-sign-up-form
title: React Daily UI - 001 Sign Up Form
description: 
published: false
author: sophia
hero_image: /assets/images/articles/react-native-firestack/react-native-firestack-hero.jpg
main_image: /assets/images/articles/react-native-firestack/react-native-firestack-hero.jpg
codeRoot: '__FILE_PATH__'
autotoc: true
fileMetaKeyHeadingsAllowed: true
---

# Fullstack React Daily UI: 001 Sign Up Form

> This post is a part of the [React Daily UI](https://codepen.io/jackoliver/) post series, a joint effort between [Jack Oliver](http://www.jackoliver.info/) and the team at [Fullstack React](https://www.fullstackreact.com/).
> [Follow the whole series here](/articles/react-daily-ui/)


Welcome to React Daily UI, where we go 100 days building 100 beautiful React applications. We're really excited to be partnering with [Jack Oliver](http://www.jackoliver.info/) who is embarking on this ambitious project with us. Jack is designing and writing the code for these applications and we're going to deconstruct each one to highlight the features that are unique to React. 

Kicking it off today, we're going to make a sign up form:

[pic]

## Overview

This sign up form has a few different features that are unique to React. The sign up form itself is a modal that uses CSS animations and slides down when the page loads and slides up after the user logs in. We are going to learn about the following features for this sign up form:

*  Using `state` and `props`
*  CSS animations
*  Event handling
*  Native browser validation for forms


## Mounting with `state`

React uses the concept of _components_ which, conceptually are containers for our data and UI. Each component has several properties and methods that we will take advantage of in this post and for the rest of the series. 

Additionally, a React component can define it's own state using a `state` property for handling stateful components, such as our form element today. 

Using the `state` property allows us to manipulate a React component's view and data associated with the view to keep track of the local state of the component. 

> ## What is `state`?
>
> When we refer to a component's `state`, we mean a snapshot of the instance of the component on the page. 
>
> In regular HTML (without React), when we have a text `<input />` box on a page, the _state_ of the `<input />` element is that the _value_ of the `<input />` component is a blank string (i.e. `""`).
> When our user types into the `<input />` box, the `state` changes for the `<input />` box to set the value to the keystroke the user made.
>
> React's components can define their own `state` which we'll use in today's post, and others in the future. When we use state in a React component the component is said to be _stateful_.

In this particular instance we are going to use the component's `state` to show and hide the form on the page. 

Let's create the sign up form by first wrapping it in a parent `App` component. This way we can define some methods in this parent component that we can use to show or hide the sign up modal view.

The basic stateful `App` component looks like this:

{lang=javascript,crop-query=(.App)}
<<[](src/App.js)

React components have a method that is frequently used called `getInitialState`. 

React expects us to return a JavaScript object from this method that stores any sort of data we want to manipulate or display in the component. 

Let's tell React that the `App` component keeps a single item in it's local state, a boolean we will call `mounted`. 

{lang=javascript,crop-query=(.App .getInitialState)}
<<[](src/App.js)

React components also have 'lifecycle hooks' where we can define custom functionality during the different phases of the component. These methods are executed at specific points in a component's lifecycle [1](#references). 

One of these hooks is the `componentDidMount` method is executed just after the component has been rendered to the page. In order to define functionality during the lifecycle, we need to define the method in the component: 

{lang=javascript,crop-query=(.App .componentDidMount)}
<<[](src/App.js)

This method is where we set our `mounted` state to `true` as now our form is inserted into the DOM and our component is prepared to show it. We change the state of our data using a component method `setState`

{lang=javascript,crop-query=window(.componentDidMount,1,1)}
<<[](src/App.js)

Although a component's state is available via `this.state`, we should treat `this.state `as a readonly object and only ever change the state using the `setState` method available on a React component.

The `setState` method sends the state object into a queue to be batched for DOM updates, so modifying or changing any portion of a component's state should only happen via `setState`.

We only want to show the modal if it is mounted, so we can include a conditional rendering statement in our component that renders the form if and only if the component has been mounted.

{lang=javascript,crop-query=window(.App .render,2,6)}
<<[](src/App.js)

This conditional statement creates the child component if the `App` component has been rendered to the DOM. Our child component, `Modal` contains a form inside of it.

## The Form

Our Modal component contains a form that looks familiar if you've built a form with HTML before. However, there are a few differences between this form and a typical HTML form. The form contains a `props` attribute as well as a custom  `<Input/>` component that also uses `this.props`.

### `this.props`

In addition to the `state` property, React components have another property called `props`. 

The difference between `state` and `props` can be a little confusing at first. `props` are used to pass down data and event handlers from parent components to child components. `state` on the other hand is used to manipulate the current state of a component. 

> Notice that a child component does _not_ pass any data back up to it's parent component. This means we can only ever pass data _down_ the component tree. This pattern of data passing is called _one-way databinding_. 
>
> A child component _can_ inform the parent component about an update it makes, but cannot change the data itself. We'll look at this process next:

Another aspect about the `props` attribute that can be a little confusing is passing down a function as a prop. When our `Modal` component is created, we pass down the `App` component's `handleSubmit` function as a prop:

{lang=javascript,crop-query=window(.App .render,4,4)}
<<[](src/App.js)

Then, in our form itself, the onSubmit event handler is given the submit callback function we passed down as a prop:

{lang=javascript,crop-query=window(.Modal .render,3,5)}
<<[](src/App.js)

The function we define as `onSubmit` can then be called by the child `<Modal />` component when the user hits the submit button in the view. The actual code for the function is found in the parent component:

{lang=javascript,crop-query=(.App .handleSubmit)}
<<[](src/App.js)

When the user clicks the submit button this event handler is called and the `mounted` variable gets set back to `false`.

We also have three `Input` components which we'll define next.

### Building reusable inputs

We can define a reusable component, which can take in `props` that get passed down from the parent `<form />` component. Three `props` we'll want to pass into the `<Input />` component are:

* name
* type
* placeholder

These particular values are JavaScript strings, unlike the `onSubmit` event handler where we passed a function. 

These props allow us to create reuseable components since we just have to pass in the type of input (either text, email or password), the name we want to associate with the input element, and the placeholder to a normal `input` element. 

{lang=javascript,crop-query=(.Input)}
<<[](src/App.js) 

### Native browser validation

Two of the input types we are using with this form are slightly different than the normal `text` type: `password` and `email`. With these input types, the browser will automatically do some validation and render the inputs slightly differently than a normal `text` type. Using the `email` type will make the browser do some simple validation of the text, including checking for the `@` symbol. Using the `password` type automatically masks the input.

## Animating with `ReactCSSTransitionGroup`

Animations in React are not always as simple as just adding a few transitions and translations to our CSS files. Since React's algorithm works differently than other JavaScript libraries such as JQuery, React requires some DOM nodes to be removed/added to the DOM instead of manipulated. 

Adding animations via CSS files aren't always straight-forward. To address this problem, React provides an addon library to ease with the difficulties: ReactCSSTransitionGroup. 

> The `ReactCSSTransitionGroup` library is not included by default when using the create-react-app tool.
> Although this library is included with the code for this post, to use it in your own projects, we'll need to install it using the `npm` package manager:
> 
> ```bash
> npm install react-addons-css-transition-group
> ```

Let's look at how to use ReactCSSTransitionGroup with our form. We'll use a few `props` on the `ReactCSSTransitionGroup` element which define the CSS `transition` name as well as a few `props` to define variables:

{lang=javascript,crop-query=(.App .render)}
<<[](src/App.js)

When the `App` component is mounted, our  `child` variable is assigned our Modal component:

{lang=javascript,crop-query=window(.App .render,1,5)}
<<[](src/App.js)

By wrapping the modal in a `ReactCSSTransitionGroup` component, we get access to the animation effect whenever the modal is added and removed from the DOM. 

The `ReactCSSTransitionGroup` must be available and mounted in the DOM for the animations to take effect. 

If the `ReactCSSTransitionGroup` node is mounted at the same time as it's children, the animations will not work. The `ReactCSSTransitionGroup` has two properties that manage the durations of the animation when the modal enters/leaves the DOM:

{lang=javascript,crop-query=window(.App .render,9,12)}
<<[](src/App.js)

Using ReactCSSTransitionGroup is great because our component code is declarative and the CSS manages the transitions in between our states of mounted and unmounted (e.g. we're not iterating over `opacity` and `y` position).

## Try it out!

Check out the Codepen example:

<iframe height='265' scrolling='no' src='//codepen.io/jackoliver/embed/qNwrrp/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/jackoliver/pen/qNwrrp/'>React DailyUI - 001 - Sign Up</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

> The complete sourcecode for this article is available on github at:
> [get code for this project here](github link to repo path).
>
> To start the app cd into the code and type:
>
>        npm install
>        npm start
>

## Sign up for email updates for the next release

## Bios / Links here












