import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [newItem, setNewItem] = useState("");
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem("itemList") || "[]"));
  const [allDone, setAllDone] = useState(localStorage.getItem("allDone") == "true" ? true : false);
  const [doneCount, setDoneCount] = useState(JSON.parse(localStorage.getItem("doneCount") || "0"));

  function handleChange(e) {
    setNewItem(e.target.value);
    console.log(e.target.value)
  }


  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      setItemList([...itemList, { "item": newItem, "done": false }])
      setNewItem("")
      setAllDone(false)
      localStorage.setItem("itemList", JSON.stringify([...itemList, { "item": newItem, "done": false }]))
      localStorage.setItem("allDone", false)
    }
  }

  function handleCheckboxClick(e) {
    itemList.map((obj, i) => {
      obj.done = e.target.checked
    })
    setItemList([...itemList])
    localStorage.setItem("itemList", JSON.stringify([...itemList]))
    setAllDone(!allDone)
    localStorage.setItem("allDone", !allDone)
    if (!allDone) {
      setDoneCount(itemList.length)
      localStorage.setItem("doneCount", itemList.length)
    }
    else {
      setDoneCount(0)
      localStorage.setItem("doneCount", 0)
    }
  }

  function handleClearCompleted(e) {
    const newTodos = itemList.filter((obj) => obj.done !== true)
    setItemList([...newTodos])
    localStorage.setItem("itemList", JSON.stringify([...newTodos]))
    setDoneCount(0)
    localStorage.setItem("doneCount", 0)
    setAllDone(false)
    localStorage.setItem("allDone", false)
  }

  return (
    <>
      <div className="" id="todoapp">
        <header>
          <h1>Todos</h1>
          <input id="new-todo" type="text" value={newItem} placeholder="What needs to be done?"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </header>
        <section id="main" style={{ display: itemList.length ? "block" : "none" }}>
          <input id="toggle-all" type="checkbox"
            onChange={handleCheckboxClick}
            checked={allDone} />
          <label for="toggle-all">Mark all as complete</label>
          <ul id="todo-list">
            {itemList.map((obj, i) => {
              return (
                <TodoItem item={obj.item} index={i} setAllDone={setAllDone} setDoneCount={setDoneCount} doneCount={doneCount} setItemList={setItemList} itemList={itemList} />
              )
            })}
          </ul>
        </section>

        <footer style={{ display: itemList.length ? "block" : "none" }}>

          <a id="clear-completed" style={{ display: doneCount ? "block" : "none" }}
            onClick={handleClearCompleted}
          >Clear {itemList.length >= doneCount ? doneCount : itemList.length} completed items</a>

          <div className="todo-count"
            style={{ display: itemList.length ? "block" : "none" }}><b>{itemList.length >= doneCount ? itemList.length - doneCount : 0}</b> items left</div>
        </footer>


      </div>
      <div id="instructions">
        Double-click to edit a todo.
      </div>
    </>
  );
}

export default App;
