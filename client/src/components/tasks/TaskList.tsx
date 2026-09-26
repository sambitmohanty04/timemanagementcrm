import type { Task } from "../../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            No tasks found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            There are no tasks in this section.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;