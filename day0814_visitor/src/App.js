import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  
  const visi = [];

  let [newVisitor, setNewVisitor] = useState('');
  let [visitors, setVisitors] = useState(visi);
  
  const insertVisitor = function() {
    visi.push(newVisitor);
    setVisitors([newVisitor, ...visitors]); // useState 갱신
    setNewVisitor('');
  }
  
  const changeInputBox = function(e) {
    setNewVisitor(e.target.value);
  }

  return (
    <div className="App">
      <input type="text" value={newVisitor} onChange={changeInputBox}/> 
      <button onClick={insertVisitor}>명단추가</button>
      {
        visitors.map((value, index)=>{
          return (<h3 key={index}>{value}</h3>);
        })
      }
    </div>
  );
}

export default App;
