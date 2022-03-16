import React from 'react';
import './App.css';
import Controller from './components/controller/Controller';
import Join from './components/join/Join';
import TaskScheduler from './components/TaskScheduler/TaskScheduler';
import TimeScheduler from './components/timeScheduler/TimeScheduler';

function App() {
  return (    
    <div className="App">
      <Controller/>
     {/* <TimeScheduler/>   */}
      <TaskScheduler/>
    </div>
  );
}

export default App;
