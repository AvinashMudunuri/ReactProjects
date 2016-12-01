import React, { Component } from 'react';
import './App.css';
import Plot from './Plot.js';
import { connect } from 'react-redux';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  fetchData
} from './actions';

class App extends Component {
  fetchData = (evt) => {
    evt.preventDefault();
    var location = encodeURIComponent(this.props.redux.get('location'));
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=4e04fe5be123b892afa980ea4d9c0a2f&units=metric';
    var url = urlPrefix + location + urlSuffix;

    this.props.dispatch(fetchData(url));
    
  }
  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  }
  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(data.points[0].x));
      this.props.dispatch(setSelectedTemp(data.points[0].y));
    }
  }
  
  render() {
    var currentTemp = 'not loaded yet';
    if(this.props.redux.getIn(['data', 'list'])) {
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }
    return (
     <div>
      <h1>Weather App</h1>
      <form onSubmit={this.fetchData}>
        <label>I want to know weather for
          <input 
            type="text" 
            placeholder={"City, Country"} 
            value={this.props.location}
            onChange={this.changeLocation}/>
        </label>
      </form>
      {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
            <p className="temp-wrapper">
              <span className="temp">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'temp']) : currentTemp }
              </span>
              <span className="temp-symbol">°C</span>
              <span className="temp-date">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'date']) : ''}
              </span>
            </p>
            <h2>{this.props.redux.get('city')}'s Forecast for Next 5 Days</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    redux : state  
  };
}

export default connect(mapStateToProps)(App);
