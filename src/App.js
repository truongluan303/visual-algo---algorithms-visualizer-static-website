import './App.css';
import { Header } from './Components/Header';
import PathfindingVisualizer from './Components/Pathfinding/PathfindingVisualizer';
import React, { Component }  from 'react';


function App() {

  return (
    <div className="App">

      <Header></Header>

      <div id="mainview">
        <PathfindingVisualizer/>
      </div>
      
    </div>
  );
}


export default App;
