import { useState } from "react";
import Form from "./components/Form"
import List from "./components/List"

interface TODO_RESULT {
  id : string
  title : string
}

function App() {

  const [todos, setTodo] = useState<TODO_RESULT[]>([]);

  const returnedValue = (result : TODO_RESULT) => {
    setTodo(prevItems => [...prevItems, result]);
  }

  const deletedTask = (id : string) => {
    const items = todos.filter((t) => t.id !== id);
    setTodo(items)
  }

  const updatedTask = (task : TODO_RESULT) => {
    const index = todos.findIndex((t) => t.id === task.id);
    todos.splice(index, 1, task);
    setTodo([...todos]);
  }


  return(
    <div className="space-y-12 text-white md:w-1/2 p-5 m-auto my-3">
      <Form todo={returnedValue}/>
      <List 
      deletedTask={deletedTask}
      updatedTask={updatedTask}
      todos={todos}/>

    </div>
  )
}

export default App
