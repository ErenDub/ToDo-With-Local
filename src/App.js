import './App.css'
import { useState, useEffect } from 'react'
import TodoUtil from './todoUtil'
function App() {
  const [todoArray, setTodoArray] = useState([])
  const [inputTitle, setInputTitle] = useState('')
  const [inputDesc, setInputDesc] = useState('')
  const [clearSure, setClearSure] = useState(false)
  const addInArray = () => {
    if (!inputTitle) {
      alert('სათაური არ არის მითითებული')
    } else {
      let lengthCounter = 0
      let idCounter = 1
      if (todoArray.length <= 0) {
        idCounter = 1
      } else {
        lengthCounter = todoArray.length - 1
        idCounter = todoArray[lengthCounter].id + 1
      }
      todoArray.push({
        id: idCounter,
        title: inputTitle,
        description: inputDesc,
        taskDone: false,
      })
    }
    // localStorage['datas'] = JSON.stringify(todoArray)
    localStorage.setItem('myArray', JSON.stringify(todoArray))

    setInputTitle('')
    setInputDesc('')
  }
  const deleteItemFromList = (deleteId) => {
    const changes = todoArray.filter((e) => e.id !== deleteId)
    setTodoArray(changes)
    localStorage.clear()
    localStorage.setItem('myArray', JSON.stringify(changes))
  }

  useEffect(() => {
    if (localStorage.getItem('myArray')) {
      setTodoArray(JSON.parse(localStorage['myArray']))
    } else {
      setTodoArray([])
    }
  }, [])
  const mapReload = () => {
    localStorage.setItem('myArray', JSON.stringify(todoArray))

    setInputTitle(' ')
    setTimeout(() => {
      setInputTitle('')
    }, 1)
  }
  return (
    <div className="globalPadding">
      <div>
        <div className="inputs">
          <input
            type="text"
            placeholder="სათაური"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            placeholder="აღწერა"
            value={inputDesc}
            onChange={(e) => setInputDesc(e.target.value)}
          />
          <div className="mainbuttons">
            <button onClick={() => addInArray()}>Add</button>

            <button
              onClick={() => {
                setClearSure(!clearSure)
              }}
            >
              {clearSure ? 'Close' : 'Clear'}
            </button>
          </div>
          {clearSure && (
            <button
              onClick={() => {
                localStorage.clear()
                setTodoArray([])
                setClearSure(!clearSure)
              }}
            >
              Are you sure?
            </button>
          )}
        </div>
        <div>
          {todoArray.map((e) => (
            <TodoUtil
              todoArray={e}
              delete={() => deleteItemFromList(e.id)}
              mapReload={() => mapReload()}
              key={e.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
