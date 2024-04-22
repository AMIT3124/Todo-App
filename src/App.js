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
    let saveCompletedTodo = JSON.parse(localStorage.getItem('competedTodo'));
    if (saveTodo) {
      setAlltodos(saveTodo);
    }
    if (saveCompletedTodo) {
      setCompletedTodos(saveCompletedTodo);
    }
  }, [])

  const handleDelete = (index) => {
    let reducedTodo = [...alltodos];
    reducedTodo.splice(index, 1);// delete 1 element at specific index

    setAlltodos(reducedTodo);


  }

  const handleDeleteCompleted = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index, 1);
    setCompletedTodos(reducedCompletedTodo);
  }

  const [completedTodos, setCompletedTodos] = useState([]);

  const handleCompletedTodo = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let completedOn = date + '-' + month + '-' + year + 'at' + hour + ':' + minute + ':' + second;

    let filterItem = {
      ...alltodos[index],
      completedOn: completedOn,

    }
    let UpdatedComletedArr = [...completedTodos];
    UpdatedComletedArr.push(filterItem)
    setCompletedTodos(UpdatedComletedArr);

    localStorage.setItem('competedTodo', JSON.stringify(UpdatedComletedArr));



  }
  return (
    <div>
      <h1>My todos</h1>
      <div className='todo-wrapper'>
        <div className='todoInput'>
          <div className='todoInputItem'>
            <label>Title</label>
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

          {isCompleteScreen === false && alltodos.map((item, index) => {
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
                    <TiTick onClick={() => { handleCompletedTodo(index) }} />
                  </div>
                </div>
              </div>
            )
          })}
          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className='todolist-item' key={index.toString()}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>{item.completedOn}</small></p>
                </div>
                <div className='icon'>
                  <div className='delete'>
                    <AiFillDelete onClick={() => { handleDeleteCompleted(index) }} />

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
