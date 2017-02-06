import React, { Component } from 'react';
import './App.css';


// App Container
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        image: 'https://static1.squarespace.com/static/55acc005e4b098e615cd80e2/5777d3433e00be9cc0d8e3f6/5777d384d482e9910faaf472/1467473313295/13.jpg?format=2500w',
        
    }
  }
  render() {
    return(
      <div className="App">
        <div className="ImageBG" style={{backgroundImage: 'url('+ this.state.image + ')'}}></div>
        <Settings image={this.state.image} />
      </div>  
    )
  }
}

// Settings Container
class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {'contrast':100,'hue':0,'brightness':100,'saturate':100,'sepia':0};
    this.props = props;
  }
  handleChange = (e)=>{
    let filter = e.target.id;
    let value = e.target.value; 
    this.setState((prevState,props)=>{
      prevState[filter] = value;
      return prevState;
    });
  }
  updateSettings = (nextFilterState)=>{
    this.setState(nextFilterState);
  }
  render() {
    return (
      <div className="Settings">
        <div className="MainWrapper">
          <div className="Sidebar">
            <div className="Title">Reactagram v1.0</div>
            <Setting name="contrast"   min={0} max={200} value={this.state.contrast} onChange={this.handleChange}></Setting>
            <Setting name="hue"        min={-360} max={360} value={this.state.hue} onChange={this.handleChange}></Setting>
            <Setting name="brightness" min={0} max={200} value={this.state.brightness} onChange={this.handleChange}></Setting>
            <Setting name="saturate"   min={0} max={100} value={this.state.saturate} onChange={this.handleChange}></Setting>
            <Setting name="sepia"      min={0} max={100} value={this.state.sepia} onChange={this.handleChange}></Setting>
          </div>
          <div className="ImageContainer">
            <Filter key="Default" filterFunctions={this.state}><Image image={this.props.image}/></Filter>          
          </div>  
      </div>
       <div className="FilterList">
            <Filter key="Noir" filterFunctions={{'contrast':138,'hue':0,'brightness':122,'saturate':0,'sepia':0}} onClick={this.updateSettings}><Image image={this.props.image}/></Filter>
            <Filter key="Aged" filterFunctions={{'contrast':94,'hue':-54,'brightness':92,'saturate':100,'sepia':44}} onClick={this.updateSettings}><Image image={this.props.image}/></Filter>
            <Filter key="Whiteout" filterFunctions={{'contrast':32,'hue':0,'brightness':173,'saturate':0,'sepia':0}} onClick={this.updateSettings}><Image image={this.props.image}/></Filter>
            <Filter key="Vintage" filterFunctions={{'contrast':164,'hue':0,'brightness':47,'saturate':0,'sepia':100}} onClick={this.updateSettings}><Image image={this.props.image}/></Filter>
        </div>
      </div>

    )
  }
}

function Setting(props){
    return (
        <div className="Setting">
          <label><div>{props.name}</div><div>{props.value}</div></label>
          <input min={props.min} max={props.max} step="1" onChange={props.onChange} id={props.name} type="range" value={props.value} />
        </div>
      );
}

Setting.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  onChange : React.PropTypes.func
};
// Filter
class Filter extends Component {

  getFilterCSSStyles = (functions)=>{
    let filterString = "";
      for (let filter in functions) {
        if( functions.hasOwnProperty(filter) ) {
          switch(filter){
            case 'hue': filterString+= 'hue-rotate(' + functions[filter] + 'deg) '; break;
            default: filterString += filter + '(' + functions[filter] + '%) '
          }
        } 
      }
      return filterString;
      
  }
  render(){
    let filterstring = this.getFilterCSSStyles(this.props.filterFunctions);
    return (  
      <div className="Filter" style={{width:'100%',height:'100%',filter: filterstring}} onClick={()=>{this.props.onClick(this.props.filterFunctions)}}>
        {this.props.children}
      </div>
    );
  } 
}

Filter.propTypes = {
  // An object taking on a particular shape
  filterFunctions: React.PropTypes.shape({
    hue: React.PropTypes.number,
    contrast: React.PropTypes.number,
    brightness: React.PropTypes.number,
    saturate: React.PropTypes.number,
    sepia: React.PropTypes.number
  }),
  onClick : React.PropTypes.func
};
// Image
function Image(props){
    return (
      <div className="Image" style={{backgroundImage: 'url(' + props.image + ')'}}></div>
    );
};

export default App;
