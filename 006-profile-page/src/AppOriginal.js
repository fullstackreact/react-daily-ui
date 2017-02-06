import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var App = React.createClass({
  getInitialState: function() {
    return({
      person: {
        name: 'Jack-Edward Oliver',
        biography: '26 year old Designer / Developer living in Stockholm. Originally from Oxford, England. Love to make stuff.',
      },
      image: 'http://static1.squarespace.com/static/55acc005e4b098e615cd80e2/t/57b057398419c2c454f09924/1471025851733/',
      quote: {
        content: 'Beautiful things don\'t ask for attention',
        source: 'The Secret Life of Walter Mitty'
      }
      
    })
  },
  render: function() {
    return(
      <div className="App">
        <Image src={this.state.image} />
        <Profile person={this.state.person} quote={this.state.quote} />
      </div>
    );
  }
});

var Image = React.createClass({
  render: function() {
    return (
      <div className="Image" style={{backgroundImage: 'url(' + this.props.src + ')'}}></div>
    );
  }
});

var Profile = React.createClass({
  render: function() {
    return (
      <div className="Profile">
        <h1 className="Name">{this.props.person.name}</h1>
        <p className="Bio">{this.props.person.biography}</p>
        <div className="Quote">
          <blockquote>&ldquo; {this.props.quote.content} &rdquo;</blockquote>
          <div className="byline">&mdash; {this.props.quote.source}</div>
        </div>
        
      </div>
    );
  }
});

export default App;
