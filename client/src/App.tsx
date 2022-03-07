import React from 'react';
import './App.css';
import Controller from './components/controller/Controller';
import Join from './components/join/Join';
import TimeScheduler from './components/timeScheduler/TimeScheduler';

function App() {
  return (    
    <div className="App">
      <Controller/>
     <TimeScheduler/>     
    </div>
  );
}

export default App;
