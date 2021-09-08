import React, { useState } from 'react'

function TodoUtil(props) {
  const [edit, setEdit] = useState(false)
  const [editValueTitle, setEditValueTitle] = useState(props.todoArray.title)
  const [editValueDescription, setEditValueDescription] = useState(
    props.todoArray.description,
  )
  const changeValues = () => {
    props.todoArray.title = editValueTitle
    props.todoArray.description = editValueDescription
    props.mapReload()
    setEdit(!edit)
  }
  return (
    <>
      <div className="todoBox">
        <div className="arrayTitle">
          {props.todoArray.title}

          <div>id:{props.todoArray.id}</div>
        </div>
        <div className="descriptions">{props.todoArray.description} </div>
      </div>
      <div>
        <button onClick={props.delete}>Delete</button>
      </div>
      <div>
        <button onClick={() => setEdit(!edit)}>
          {edit ? 'Close' : 'Edit'}
        </button>
        <br />

        {edit && (
          <>
            <input
              type="text"
              value={editValueTitle}
              onChange={(e) => setEditValueTitle(e.target.value)}
            />{' '}
            <br />
            <textarea
              type="text"
              value={editValueDescription}
              onChange={(e) => setEditValueDescription(e.target.value)}
            />
            <br />
            <button onClick={() => changeValues()}>Save</button>
          </>
        )}
      </div>
    </>
  )
}

export default TodoUtil
