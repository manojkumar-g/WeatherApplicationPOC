import React from 'react';
import {render} from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './pages/App.jsx';


injectTapEventPlugin();

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <App/>
    </MuiThemeProvider>
  , document.getElementById('app'));
