import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { FaPenToSquare } from "react-icons/fa6";
import { PiListChecksBold } from "react-icons/pi";

function Lists({lists, setLists, setActiveList, activeList}){
    
    const [newList, setNewList] = useState("")
    
    const handleNewList = (e) => {
        e.preventDefault()
        setLists(prevLists => [...prevLists, {
          id: uuidv4(),
          name: newList
        }])
        setNewList("")
      }

    const handleChangeList = (list) => {
        setActiveList({id: list.id, name: list.name})
    }

    return (
        <div>
            <div className='row header'>
                <PiListChecksBold size="3em" color="black"/>
                <h1>Task-It</h1>
            </div>
            <form className="" onSubmit={handleNewList}>
              <div className="input-group">
                  <input required className="input" type="text" placeholder="New List" value={newList} onChange={(e) => {setNewList(e.target.value)}}></input>
                  <button className="icon green" type="submit"><FaPenToSquare size="1.5em" color="white"/></button>
              </div>
            </form>
            <div className='list'>
                {lists.map((obj) => {
                    return <div key={obj.id} className='list-item'><button className="btn" onClick={() => handleChangeList(obj)}>{obj.name}</button></div>
                })}
            </div>
            
        </div>
    )
}

export default Lists;