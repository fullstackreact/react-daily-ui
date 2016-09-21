 import React from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ImagePreview from './components/ImagePreviewArea/ImagePreview'
import Checkout from './components/CheckoutArea/Checkout'


var Overlay = React.createClass({
  render: function() {
    return (
      <div className="Overlay" style={{'backgroundImage':'url(' + this.props.image + ')'}}>
        Something
      </div>
    );
  }
});
var Container = React.createClass({
    render: function() {
    return (
      <div className="Container">
        {this.props.children}
      </div>
    )
  }
});
var Header = React.createClass({
  
  render: function() {
    return (
      <header>
        <input onChange={this.props.onChange} type="range" max="100" min="1" step="1" />
      </header>
    );
  }
});

var App = React.createClass({
  
  getInitialState: function() {
    return ({
      mounted: false,
      people: 1,
      price: 320.00,
      tax: 20,
      duration: 5,
      discount: 5
    });
  },
  
  componentDidMount: function() {
    this.setState({ mounted: true });
  },
  
  handleSubmit: function(e) {
    console.log('handle ajax submission here');
    e.preventDefault();
  },
  
  handleChange: function(e) {
    this.setState({ duration: e.target.value });
  },

  render: function() {
    
    var overlay, container;
    if(this.state.mounted) {
      overlay = (
        <Overlay image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
      );
      container = (
        <Container>
          <ImagePreview price={this.state.price} duration={this.state.duration} people={this.state.people} image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
          <Checkout duration={this.state.duration} discount={this.state.discount} tax={this.state.tax} price={this.state.price} onSubmit={this.handleSubmit} />
        </Container>
      );
    }
    
    return(
      <div className="App">
        <ReactCSSTransitionGroup transitionName="overlay" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {overlay}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="container" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {container}
        </ReactCSSTransitionGroup>
        <Header onChange={this.handleChange} />
      </div>
    );
  }
});
export default App

