import React from 'react'
import './App.css';

var Icon = React.createClass({
  getInitialState : function(){
    return {
      time: 1,
      icon: '',
      location: '',
      temp:"",
      weather_code:"",
    };
  },
  fetchWeatherData(city){
    const baseUrl = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `1fbaf6e0d29ea877ae5852504eef4e82`;
    const query = `units=imperial&appid=${appId}`;
      fetch(`${baseUrl}${path}?q=${city}&${query}`)
      .then((response)=>{
        return response.json()})
      .then((data)=>{
        var date = new Date();
        var time = date.getHours();
        this.setState({time:time,
          temp:Math.round(data.main.temp),
          location:city,
          weather_code:data.weather[0].id
        })
      })
      .catch((error)=>{
          console.log(error)
      });
  },

  fetchIP: function() {
    fetch('//freegeoip.net/json/')
      .then((response)=>{
          return response.json();
      }).then((data)=>{
          let city = data.city;
          this.fetchWeatherData(city);
      }).catch((error)=>{
        console.log(error)
      });
    
  },
  componentDidMount: function() {
    this.fetchIP();
  },
  render: function() {
    return (
      <div className="Icon" data-hour={this.state.time}>
        <div className="Sky"></div>
        <WeatherIcon src={this.state.icon} weatherCode={this.state.weather_code} timeOfDay={this.state.time}/>
        <div className="Information">
          <div className="Location">{this.state.location}</div>
          <div className="Temperature">{this.state.temp} &deg; F</div>  
        </div>
      </div>
    );
  }
});

var WeatherIcon = React.createClass({  
  render: function() {
    let timeOfDay = 
      (this.props.timeOfDay > 7 && this.props.timeOfDay < 18) 
      ? 'day' : 'night';
    let className = 'WeatherIcon wi ' 
    className += 'wi-owm-'+timeOfDay+'-'+this.props.weatherCode;
    return (<i className={className}></i>);
  }
});

export default Icon;