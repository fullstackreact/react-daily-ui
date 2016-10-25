---
page_id: react-daily-ui-004
series: react-daily-ui
permalink: 004-calculator
title: React Daily UI - 004 Calculator
description: 
published: true
draft: false
authors: [ 'sophia', 'jack' ]
hero_image: /assets/images/articles/react-daily-ui/004/react-daily-ui-004-calculator.jpg
main_image: /assets/images/articles/react-daily-ui/004/react-daily-ui-004-calculator.jpg
codeRoot: '__FILE_PATH__'
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

Today we're going to create a calculator:

<iframe class='wide' height='600' scrolling='no' src='//codepen.io/jackoliver/embed/JKqAYp/?height=600&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/JKqAYp/'>React DailyUI - 004 - Calculator</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## Overview

Today we are going to make a calculator. We're going to use a few additional libraries, `mathjs`,`node-sass`, `nodemon` and `concurrently` to build our calculator. Instead of using the `npm` client, we are going to use the new Yarn package manager to include these libraries. We'll also learn about immutability and explore how to use Sass with the `create-react-app` command line tool. 

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
        This post is the one of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed.
      </p>
      <div class="form-container">
        <form action="//ng-newsletter.us6.list-manage.com/subscribe/post?u=86d6f14c7cc955128485e3b8e&amp;id=2877dfe707" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form-inline" target="_blank" novalidate>
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">Email address</label>
            <input type="email" class="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter email">
            <input type="hidden" name="FORMID" value="DailyUI-001-a">
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

## Using Yarn instead of `npm`

Yarn is a new package manager built through a colloborative effort from engineers at Facebook, Google, Tilde and Exponent. It is a replacement for the `npm` client that many JavaScript developers have been using to manage dependencies between various JavaScript libraries. It does not replace the `npm` registry, only the `npm` command line tool used to manage dependencies. If you have used the `npm` command line tool to add/remove dependencies, using Yarn will feel very familiar.  

The engineers at Facebook found they were stretching the limits of what the `npm` client could do. Running `npm install` was not a predicatable process across all machines and operating systems and updating a single dependency was often larger than expected due to other dependencies getting updated at the same time. Yarn's implementation solves these issues along with a few other pain points engineers encountered. If you'd like to read more details about Yarn, [read the announcement on Facebook's blog](https://code.facebook.com/posts/1840075619545360). In this blog post and future blog posts we'll be using Yarn when we need to install an extra library. There are a variety of ways to install Yarn (see the docs here: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)), but since we already have `npm` and Node installed, we'll use `npm`:

`npm install -g yarn`


## Making Calculations

Our calculator does some simple operations: addition, subtraction, division and multiplaction. To keep track of which button the user clicked, we are going to keep an array of all the button values. We are going to store this array in our `App` component's `state` property. 

> ### What is `state`?
>
> When we refer to a component's `state`, we mean a snapshot of the data belonging to a particular _instance_ of the component. 
> React's components can define their own `state` which we'll use in today's post, and others in the future. Using the `state` property allows us to manipulate a React component's view and data associated with the view to keep track of the local state of the component. 

We set the initial state of our `App` component by defining a method called `getInitialState`. React expects us to return a JavaScript object from this method that stores any sort of data we want to manipulate or display in the component. 

Let's tell React that the `App` component keeps an item in it's local state, an array we'll call `operations`:

{lang=javascript,crop-query=(.App .getInitialState),undent=true}
<<[](src/App.js) 

We have multiple buttons in our application, one for each number and then one for each operation: addition (`+`), subtraction (`-`), multiplication (`x`), and division (`\`). We also have an equals button (`=`) and a clear button (`C`). Each button has an onClick event handler function attached to it:

{lang=javascript,crop-query=window(.App .render,4,26),undent=true}
<<[](src/App.js) 

The `handleClick` function is called when the user clicks any button. To determine which button the user pushed, our code has a switch statement. When the user clicks any button except for the `=` and `C` we add the value of the button to our operations array:

{lang=javascript,crop-query=window(.App .handleClick,9,12),undent=true}
<<[](src/App.js) 

We don't want to use the regular `push` method for JavaScript arrays to add our values to `this.state.operations` because that modifies the original array. JavaScript arrays are __mutable__ and we want our `this.state.operations` array to be __immutable__. 

> ### What is immutability?
> When we use the term `immutability` (or say something is `immutable`) we mean an object (or in our case an array) that cannot be changed once it is created. Arrays and objects are `mutable` - you can add values to the original array or object. But we don't want to mutate our objects because it can cause consistency problems down the line.
>
> Interestingly, in JavaScript strings and numbers are immutable, once a string is created, it cannot be altered. Similarly a number itself cannot be changed (e.g. `42` is always `42` and never `43`). This is somewhat counter-intuitive in that we append to strings or increment numbers. But what's happening when we append/increment is not that the string/number itself is _changing_ but rather we're changing the value of the variable we're assigning that value to. 

Rather than modifying `this.state.operations`, we want to **return a new array** that **has the new value** in it. React has an addon library `update` that allows us to create a new array or object every time we want to add a value to our object or array. We'll use this update function modify `this.state.operations`:

{lang=javascript,crop-query=window(.App .handleClick,10,10),undent=true}
<<[](src/App.js)

This line of code says take `this.state.operations` and "push" (add to) that array the `value`. The `$push` syntax is interpreted as an _operation_ to the `update()` function. You can [read more about these immutability helpers here](https://facebook.github.io/react/docs/update.html). 

Once we've modified our operations array, we'll call `this.setState` to tell React our component has changed and the DOM needs updating:

{lang=javascript,crop-query=window(.App .handleClick,11,11),undent=true}
<<[](src/App.js)

By using immutable arrays and objects in our React applications we can optimize performance and improve reliability. You can rely on data in a given object and know it will not change somewhere else in your application (and cause unintended consequences). While it's hard to see in a small application like this the performance and reliability benefits, `immutability` is an important concept to learn because the bigger the application is, the more performance and reliability matter. In future blog posts we will go into more detail about how to optimize performance with React using immutable data structures.

When the user clicks the `=` button we need to evaluate the expression to get the final value. We could use the global `eval` function to evaluate the string, but this is prone to security holes since it will evaluate any JavaScript expression, not just math expressions. In the future, if we want to expand our calculator to do more than just addition, subtraction, multiplication and division, it will be beneficial to use a library that allows us to go beyond those operations. We will use the `mathjs` library to evaluate our expression. 

`mathjs` includes its own `eval` function which only parses mathematical expressions and so it doesn't suffer from the same security pitfalls as using the global `eval`. We'll use `math.eval()` to calculate the result of our calculator inputs.  

To use `mathjs`, we'll install it via Yarn. To include a library with Yarn we run this command:

`yarn add mathjs`

To use the library we import it into our file:

{lang=javascript,crop-query=window(.math,0,0),undent=true}
<<[](src/App.js)

When the user clicks the `=` button we call the `calculateOperations` method. In this method we combine all the entries in the array into a string using the `join` method:

{lang=javascript,crop-query=window(.App .calculateOperations,1,1),undent=true}
<<[](src/App.js)

We use the mathjs `eval` function to evaluate the expression and wrap the expression back into a string so it will display properly: 

{lang=javascript,crop-query=window(.App .calculateOperations,3,3),undent=true}
<<[](src/App.js)

Finally, we call `this.setState` to update our application:

{lang=javascript,crop-query=window(.App .calculateOperations,4,4),undent=true}
<<[](src/App.js)

If the user clicks on the `C` button, we want to clear everything out of our operations array and update our component using `this.setState`:

{lang=javascript,crop-query=window(.App .handleClick,4,4),undent=true}
<<[](src/App.js)

To actually display the values in the `this.state.operations` array we have a `Display` component. It takes the `this.state.operations` array as a `prop` named `data`. Every time `this.setState` is called and our `operations` array has changed, our `Display` component will change as well:

{lang=javascript,crop-query=window(.App .render,3,3),undent=true}
<<[](src/App.js)

In our `Display` component we take all the values from `this.state.operations` and concatenate them into a string using the `join` method. Our render method returns the string wrapped in a `div`:

{lang=javascript,crop-query=(.Display .render),undent=true}
<<[](src/App.js)

## Sass with create-react-app
For each one of our React Daily UI projects, we've been using the `create-react-app` command line tool to get started. `create-react-app` is the official tool from Facebook for starting a new React application. At this point in time, the tool doesn't allow for any customizations. Using Sass with the create-react-app requires a little extra work on our part. There are a few different options we can use to combine Sass and create-react-app. 

### Option 1: `npm run eject`  
If you have a highly customized and complicated build process for your Sass/CSS files and are looking to start a new project with React using your existing build process, it is probably beneficial to run the `npm run eject` command. This command will copy all the configuration files and into your project so you have full control over them. You will lose any future updates to the create-react-app tool and it's associated scripts, but you'll also have full control over configuring your application just the way you want. 

### Option 2: Run a Sass watcher in the background
Another option is to run a Sass compiler and watch for the changes in a background script by running a command like this: 

`node-sass --watch --recursive src & react-scripts start`

The drawback to this method is that if you kill your process, the background process will still be running. You'll have to use the `ps` command to find the background process and kill it manually.

### Option 3: Use the `concurrently` library

`concurrently` is a library that allows you to run multiple processes at the same time without the hassle of creating a background process.

Let's first set up a Sass file watcher that will compile our .scss files into .css files.

We'll use two libraries: `node-sass` and `nodemon`. `node-sass` is a library that provides Node.js bindings to LibSass, the C version of a Sass precompiler. `nodemeon` is a file watcher that will reload the server when any file changes on the system.

All of our styles are stored in the `src/App.scss` file. To compile our Sass files using `node-sass` we'll run this command:

`node-sass --include-path scss src/App.scss src/App.css`

We'll add this command to our `package.json` file in the `"scripts"` section below the `eject` command:

`"build-css": "node-sass --include-path scss src/App.scss src/App.css",`

To use `nodemon` to watch our Sass files we'll add another script in our package.json file:

`"watch-css": "nodemon -e scss -x \"npm run build-css\"",`

The `-e` flag tells `nodemon` to watch files with the .scss extension and the `-x` flag tells `nodemon` to execute the script specified, in this case it will compile all our Sass files to CSS.

Now, in order to add a Sass file watcher and run the `npm start` command at the same time let's first add the `concurrently` library using Yarn: 

`yarn add concurrently`

 Then we add another command: `start-with-sass` to our `package.json` file. We combine our `watch-css` command with `npm start` (the command that starts the development server):

`"start-with-sass": "concurrently --kill-others \"npm run watch-css\" \"npm start\""`

The `--kill-others` flag says kill all the scripts that are running at the same time.

## Try it out!

Check out the Codepen example:

<iframe  class='wide'  height='600' scrolling='no' src='//codepen.io/jackoliver/embed/JKqAYp/?height=600&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jackoliver/pen/JKqAYp/'>React DailyUI - 004 - Calculator</a> by Jack Oliver (<a href='http://codepen.io/jackoliver'>@jackoliver</a>) on <a href='http://codepen.io'>CodePen</a>.
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
        This post is one of many that will explain step-by-step how to create professional UI components in React. If you want to become a pro at building UIs in React, put in your email below and we'll notify you as each post is completed.
      </p>
      <div class="form-container">
        <form action="//ng-newsletter.us6.list-manage.com/subscribe/post?u=86d6f14c7cc955128485e3b8e&amp;id=2877dfe707" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form-inline" target="_blank" novalidate>
          <div class="form-group">
            <label class="sr-only" for="exampleInputEmail2">Email address</label>
            <input type="email" class="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter email">
            <input type="hidden" name="FORMID" value="DailyUI-001-b">
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
