import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [alltodos, setAlltodos] = useState([]);
  const [newTital, setNetTital] = useState([]);
  const [newDescription, setNewDescription] = useState('');

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTital,
      description: newDescription
    }

    let updatedTodoArr = [...alltodos];
    updatedTodoArr.push(newTodoItem);
    setAlltodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }
  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    if (saveTodo) {
      setAlltodos(saveTodo);
    }
  }, [])

  const handleDelete = (index) => {
    let reducedTodo = [...alltodos];
    reducedTodo.splice(index, 1);// delete 1 element at specific index

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAlltodos(reducedTodo);


  }
  return (
    <div>
      <h1>My todos</h1>
      <div className='todo-wrapper'>
        <div className='todoInput'>
          <div className='todoInputItem'>
            <label>title</label>
            <input
              type='text'
              placeholder='what is the title'
              value={newTital}
              onChange={(e) => { setNetTital(e.target.value) }}></input>

          </div>
          <div className='todoInputItem'>
            <label>Description</label>
            <input
              type='text'
              placeholder='what is the Description'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}></input>

          </div>
          <div className='todoInputItem'>

            <button className='primarybtn'
              onClick={handleAddTodo}>Add</button>

          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>completed</button>
        </div>
        <div className='todolist'>

          {alltodos.map((item, index) => {
            return (
              <div className='todolist-item' key={index.toString()}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className='icon'>
                  <div className='delete'>
                    <AiFillDelete onClick={() => { handleDelete(index) }} />

                  </div>
                  <div className='check'>
                    <TiTick />
                  </div>
                </div>
              </div>
            )
          })}


        </div>
      </div>

    </div >
  );
}

export default App;
