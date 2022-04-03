import { DestroyTodo, TodoEdit, TodoLi, Toggle } from "./Todo.styles"

type Callback = (...args: any[]) => void

interface TodoProps {
  editing: boolean
  completed: boolean
  text: string
  onTodoCancel: Callback
  onTodoToggle: Callback
  onTodoEdit: Callback
  onTodoSave: Callback
  onTodoDestroy: Callback
}

function save (onTodoDestroy: Callback, onTodoCancel: Callback, onTodoSave: Callback) {
  return function (event: any) {
    const val = event.target.value.trim()
    if (!val) {
      onTodoCancel()
      onTodoDestroy()
    } else {
      onTodoSave(val)
    }
  }
}

function keyDown (onTodoCancel: Callback, appliedSave: Callback) {
  return function (event: any) {
    if (event.which === 27) { // escape
      onTodoCancel()
    } else if (event.which === 13) { // enter
      appliedSave(event)
    }
  }
}

export default function Todo ({ editing, completed, text, onTodoCancel, onTodoDestroy, onTodoEdit, onTodoSave, onTodoToggle }: TodoProps) {
  const appliedSave = save(onTodoDestroy, onTodoCancel, onTodoSave)

  return (
    <TodoLi className={`${(completed ? 'completed' : null)}`}>
      {
        editing
          ? <TodoEdit defaultValue={text} onBlur={appliedSave} onKeyDown={keyDown(onTodoCancel, appliedSave)} />
          : (
            <div>
              <Toggle type='checkbox' checked={completed} onChange={onTodoToggle} />
              <label onDoubleClick={onTodoEdit}>{text}</label>
              <DestroyTodo onClick={onTodoDestroy} />
            </div>
          )
      }
    </TodoLi>
  )
}
