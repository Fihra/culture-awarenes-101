import React from 'react';
import './App.css';
import Category from "./components/Category";
import Source from './components/Source';

import { Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Typography variant="h3">
        How not to be a RACIST!
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
        {/* <h1>How not to be a RACIST!</h1>
        <h2>#BlackLivesMatter</h2>
        <p>Educate yourself with other cultures, starting with Black Culture.</p>
        <p>Take an Anthropology, Ethnic Studies, or a culture-based course.</p>
        <p>If you can't, choose a category for a random fact.</p> */}
        <Source/>
        <Category/>
    </div>  
  );
}

export default App;
