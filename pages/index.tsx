import type { NextPage } from 'next'
import {useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Home : NextPage = () => {
  
  const [tasks, setTasks] = useState<{name: string, status: string}[]>([
    // {name: "task 1", status: "active"}
  ])

  const [newTaskName, setNewTaskName] = useState("")

  const [filter, setFilter] = useState('all')

  return (
    <div className="h-screen flex justify-center py-[10%]">
      <div className="w-[30%]">
        <h1 className="text-4xl text-indigo-500 font-semibold text-center">Tasks</h1>
        <div className="bg-white w-full rounded-lg filter drop-shadow-lg py-20 px-10">
          <form onSubmit={(e) => {
            e.preventDefault()
            setTasks([
              ...tasks,
              {name: newTaskName, status: "active"}
            ])
            setNewTaskName("")
          }}>

            <input className="border-b-2 focus:outline-none w-full" placeholder="New task name..." type="text" value={newTaskName} onChange={(e) => {setNewTaskName(e.target.value)}}></input>
          </form>
          {filter === 'all' ? tasks.map((val, index) => (
            <div key={`${val.name} ${index}`} className="border-b py-8 flex items-center pr-4">
              <Checkbox checked={val.status === 'completed'} onChange={(e) => {
                setTasks([
                  ...tasks.slice(0,index),
                  {...val, status: val.status === "active" ? "completed" : "active"},
                  ...tasks.slice(index+1),
                ])
              }}/>
              <span>{val.name}</span>

              <button className="float-right justify-self-end ml-auto" onClick={() => {
                setTasks([
                  ...tasks.slice(0,index),
                  ...tasks.slice(index+1),
                ])
              }}><HighlightOffIcon /></button>


            </div>
          )) : tasks.filter((val) => val.status === filter).map((val, index) => (
            <div key={`${val.name} ${index}`} className="border-b py-8 flex items-center pr-4">
              <Checkbox checked={val.status === 'completed'} onChange={(e) => {
                setTasks([
                  ...tasks.slice(0,index),
                  {...val, status: val.status === "active" ? "completed" : "active"},
                  ...tasks.slice(index+1),
                ])
              }}/>
              <span>{val.name}</span>

              <button className="float-right justify-self-end ml-auto" onClick={() => {
                setTasks([
                  ...tasks.slice(0,index),
                  ...tasks.slice(index+1),
                ])
              }}><HighlightOffIcon /></button>


            </div>
          ))}
          

          <div className="mt-8 flex">
              <span className="whitespace-nowrap">{tasks.filter((val) => val.status === 'completed').length} tasks completed</span>
              <div className="justify-self-center w-full flex justify-center">
                <button className={`mx-2 px-4 ${filter === "all" ? "border" : ""}`} onClick={() => {
                  setFilter("all")
                }}>All</button>
                <button className={`mx-2 px-4 ${filter === "completed" ? "border" : ""}`} onClick={() => {
                  setFilter("completed")
                  console.log(tasks.filter((val) => val.status === "completed"))
                }}>Completed</button>
                <button className={`mx-2 px-4 ${filter === "active" ? "border" : ""}`} onClick={() => {
                  setFilter("active")
                }}>Active</button>
              </div>
              
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home
