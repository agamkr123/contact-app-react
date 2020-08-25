import React from 'react';
import './App.scss';

import Homepage from './pages/homepage/home_page.js';
import ContactPage from './pages/contactpage/contact_page';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
        <Route path="/home" exact component={Homepage} />
        <Route path="/contacts" exact component={ContactPage} />
        <Redirect to="/home" />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
