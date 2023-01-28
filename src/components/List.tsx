import Task from "./Task";

interface TODO_RESULT {
  id: string;
  title: string;
}

interface Props {
  todos: TODO_RESULT[];
  deletedTask: (id: string) => void;
  updatedTask: (result: TODO_RESULT) => void;
}

export default function List(props: Props) {
  const findDeletedTaskId = (id: string) => {
    props.deletedTask(id);
  };

  const findAndUpdateTask = (result : TODO_RESULT) => {
    props.updatedTask(result);
  }

  return (
    <div>
      {props.todos.length < 1 ? (
        <p>There is no task yet...</p>
      ) : (
        props.todos.map((t) => (
          <Task
            key={t.id}
            title={t.title}
            id={t.id}
            deletedTask={findDeletedTaskId}
            updatedTask={findAndUpdateTask}
          />
        ))
      )}
    </div>
  );
}
