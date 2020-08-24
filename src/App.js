import React from 'react';
import './App.scss';

import Homepage from './pages/homepage/home_page.js';
import ContactPage from './pages/contactpage/contact_page';

function App() {
  return (
    <div className="App">
      <ContactPage/>
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
