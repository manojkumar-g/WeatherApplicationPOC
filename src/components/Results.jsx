import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';

export default class MainAppBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 'a',
      ready:false,
      weatherData:{},
      days:[],
    };
    this.handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  this.getWeather = this.getWeather.bind(this);
}
  getWeather(city){
      let url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+",us&mode=json&appid=05ca973f81bfcd400cc54c6398461827";
      console.log(url);
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          var dates = this.filterDates(data.list);
          this.setState({ready:true,weatherData:data,days:dates,value:dates[0]});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
  }
  componentWillReceiveProps(nextProps){
    this.getWeather(nextProps.city);
    if(this.state.ready === true){
      this.setState({ready:false});
    }
  }
  filterDates(data){
    let day = [];
    day[0] = data[0].dt_txt.split(" ")[0];
    let ind = 0;
    for(let i in data){
        let x = data[i];
        if(x.dt_txt.split(" ")[0] !== day[ind])
          day[++ind] = x.dt_txt.split(" ")[0];
    }
    return day;

  }
  singleTab(title){
    let data = this.state.weatherData.list;
    let newData = data.filter((item) => {
      if(item.dt_txt.split(" ")[0] === title)
        return item;
    })
    return(
      <Tab label={"On "+title} value={title} key={title}>
          {newData.map(
            (data)=>{
              let time = data.dt_txt.split(" ")[1];
              return(this.singleReport(time,data));
            }
          )}

      </Tab>
    );

  }
  singleReport(time,data){
    return(
      <div className="panel panel-info col-sm-4" key = {data.dt_txt}>
        <div className="panel-heading">{"At "+time}</div>
        <div className="panel-body">
        <span>
          MinTemp: <b>{data.main.temp_max}  </b>
          MaxTemp: <b>{data.main.temp_min} </b><br/>
          Humidity: <b>{data.main.humidity}  </b>
          Weather: <b>{data.weather[0].description.toUpperCase()}</b>
        </span>
        </div>
    </div>
  );
    }

  render(){
    console.log(this.state);

    return(
      <Card>
        <CardHeader
            title="Weather In Past  days"
          />
        {(!this.state.ready && this.props.city !=="") && <div className="center"><CircularProgress size={80} thickness={3.5}/></div>}
        {this.state.ready &&
        <CardMedia>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
              {
                this.state.days.map(
                  (day)=>{
                    return(this.singleTab(day))
                  }
                )
              }

        </Tabs>

        </CardMedia>}
      </Card>);

  }
}
