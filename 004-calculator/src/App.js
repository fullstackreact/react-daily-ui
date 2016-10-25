import React from 'react'
import update from 'react-addons-update'
import math from 'mathjs'
import './App.css';

var App = React.createClass({
  getInitialState: function() {
    return ({
      operations: []
    });
  },
  calculateOperations: function() {
    var result = this.state.operations.join('');
    if(result){
      result = String(math.eval(result));
      this.setState({ operations : [result] });
    }
    
  },
  handleClick: function(e) {
    var value = e.target.getAttribute('data-value');
    switch (value) {
      case 'clear':
        this.setState({ operations: []});
        break;
      case 'equal':
        this.calculateOperations();
        break;
      default:
        var newOperations = update(this.state.operations, {$push: [value]});
        this.setState({operations: newOperations});
        break;
    }
  },
  render: function() {
    return (
      <div className="App">
        <Display data={this.state.operations} />
        <Buttons>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />
          
          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />
          
          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button label="" value="null" />
          
          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
          <Button onClick={this.handleClick} label="=" size="2" value="equal" />
        </Buttons>
      </div>
    );
  }
});

var Display = React.createClass({
  render: function() {
    var string = this.props.data.join('');
    return (
      <div className="Display">
        {string}
      </div>
    );
  }
});

var Buttons = React.createClass({
  render: function() {
    return (
      <div className="Buttons">
        {this.props.children}
      </div>
    )
  }
});

var Button = React.createClass({
  render: function() {
    return (
      <div onClick={this.props.onClick} className="Button" data-size={this.props.size} data-value={this.props.value}>
      {this.props.label}  
      </div>
    )
  }
});

export default App;