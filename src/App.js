import React, { useState } from 'react';
import './App.css';
import Lists from './Lists';
import Tasks from './Tasks';

function App() {
  const [lists, setLists ] = useState([
    {id: 1, name: "Grocery"},
    {id: 2, name: "Reminders"},
  ])
  const [activeList, setActiveList] = useState()
  return (
    <div className="App">
      <div className='split'>
        <div className='sidebar'>
          < Lists lists={lists} setLists={setLists} setActiveList={setActiveList} activeList={activeList} />
        </div>
        <div className='main'>
          <Tasks lists={lists} setLists={setLists} setActiveList={setActiveList} activeList={activeList}/>
        </div>
      </div>
    </div>
  );
}

export default App;
