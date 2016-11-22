import React from "react";
import Header from '../components/Header.jsx';
import SearchForm from '../components/SearchForm.jsx';
import Results from '../components/Results.jsx';

export default class MainAppBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {city:""};
    this.changeCity = this.changeCity.bind(this);
  }
  changeCity(newCity){
    this.setState({city:newCity});
  }
  render(){
    let action = this.changeCity;
    let city = this.state.city;
    return(
      <div>
      <Header/>
      <div className="well well-lg">
      <SearchForm changeCity = {action}/>
      <Results city = {city}/>
      </div>
      </div>
    );
  }
}
