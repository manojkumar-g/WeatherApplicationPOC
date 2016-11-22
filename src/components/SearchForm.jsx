import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';


export default class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {cities:['']};
    this.getCities = this.getCities.bind(this);
  }
  getCities(city){
    this.props.changeCity(city);
  }

  render(){
    let cities = this.state.cities;
    return(
      <div>
        <Paper zDepth={2}
        style = {{padding: '10px', margin: '10px'}}>

          <AutoComplete
            floatingLabelText="Enter the city you wanted to search"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={cities}
            fullWidth = {true}
            maxSearchResults = {5}
            onUpdateInput = {this.getCities.bind(this)}
          />
        </Paper>
      </div>
    );
  }

}
