import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

function Tasks({lists, setLists, setActiveList, activeList}) {
    const [tasks, setTasks] = useState([
        {id: 1, name: "Eggs", list_id: {id: 1, name:"Grocery"}, completed: false},
        {id: 2, name: "Laundry", list_id: {id: 2, name:"Reminders"}, completed: false},
    ])

    const [newTask, setNewTask] = useState("")

    const handleNewTask = (e) => {
        e.preventDefault()
        if(!activeList) {return}
        setTasks(prevTask => [...prevTask, {
        id: uuidv4(), 
        name: newTask, 
        list_id: activeList, 
        completed: false
        }])
        setNewTask("")
        console.log(tasks)
    }

    const handleCheckbox = (task) => {
        const newState = tasks.map(obj => {
            if (obj.id === task.id) {
                return {...obj, completed: !obj.completed};
            }
            return obj;
        });
        setTasks(newState);
    }

    const handleDeleteList = (list) => {
        const filteredLists = lists.filter(item => item.id !== list.id)
        setLists(filteredLists)
        const filteredTasks = tasks.filter(item => item.list_id !== list.id)
        setTasks(filteredTasks)
        setActiveList()
    }

    const handleCompletedTasks = (list) => {
        const filteredTasks = tasks.filter(item => item.completed !== true)
        setTasks(filteredTasks)
    }

    const handleDeleteTask = (task) => {
        const filteredTasks = tasks.filter(item => item.id !== task.id)
        setTasks(filteredTasks)
    }

  return (
    <div>
        {activeList ? (
            <>  
                <div className='row'>
                    <h1>{activeList?.name}</h1>
                    <button onClick={() => handleDeleteList(activeList)} className='action-btn'>Delete List</button>
                    <button onClick={() => handleCompletedTasks(activeList)} className='action-btn'>Delete Completed Tasks</button>
                </div>
                
                <form className="" onSubmit={handleNewTask}>
                    <div className="input-group">
                        <input required className="input" type="text" placeholder="New Task" value={newTask} onChange={(e) => {setNewTask(e.target.value)}}></input>
                        <button className="icon green" type="submit"><FaPlus size="1.5em" color="white"/></button>
                    </div>
                </form>
                <div className='list'>
                    {tasks.sort((a,b) => a.completed > b.completed).map((obj) => {
                        if(obj.list_id.id === activeList.id) {
                        return <div key={obj.id} className='task-item'><div><input className="" onChange={() => handleCheckbox(obj)} type="checkbox" checked={obj.completed}/>{obj.name}</div><button onClick={() => handleDeleteTask(obj)} className='action-btn'><FaTrashAlt size="1.2em"/></button></div>
                        }
                        return null
                    })}
                </div>
            </>
                  ) : (
                    <h1>Select a list to start adding!</h1>
                  )}
        
        
    </div>
  )
}

export default Tasks