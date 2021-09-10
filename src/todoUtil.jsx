import React, { useState } from 'react'

function TodoUtil(props) {
  const [edit, setEdit] = useState(false)
  const [editValueTitle, setEditValueTitle] = useState(props.todoArray.title)
  const [taskDone, setTaskDone] = useState(props.todoArray.taskDone)
  const [editValueDescription, setEditValueDescription] = useState(
    props.todoArray.description,
  )
  const changeValues = () => {
    props.todoArray.title = editValueTitle
    props.todoArray.description = editValueDescription
    props.mapReload()
    setEdit(!edit)
  }
  const taskDoneSave = () => {
    setTaskDone(!taskDone)
    props.todoArray.taskDone = !taskDone
    props.mapReload()
  }
  return (
    <>
      <div className={taskDone ? 'todoBox done' : 'todoBox'}>
        <div className="arrayTitle">
          {props.todoArray.title} {taskDone ? 'True' : 'False'}
          <div>id:{props.todoArray.id} </div>
        </div>
        <div className="descriptions">{props.todoArray.description} </div>
      </div>

      {taskDone ? (
        <></>
      ) : (
        <>
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
      )}

      <button
        className="checkButton"
        onClick={() => {
          taskDoneSave()
        }}
      >
        {taskDone ? '❎' : '✅'}
      </button>
    </>
  )
}

export default TodoUtil
