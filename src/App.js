import React from 'react';
import './App.css';
import Category from "./components/Category";
import Source from './components/Source';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <Typography variant="h3">
        Don't be Racist 101
      </Typography>
      <Typography variant="h4">
        #BlackLivesMatter
      </Typography>
      <Typography>
      Educate yourself with other cultures, starting with Black Culture.
      </Typography>
      <Typography>
      Take an Anthropology, Ethnic Studies, or a culture-based course.
      </Typography>
      <Typography>
      If you can't, choose a category for a random fact.
      </Typography>
        <Source/>  
        <Category/>
    </div>  
  );
}

export default App;
