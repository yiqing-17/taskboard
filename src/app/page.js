'use client';

import Image from "next/image";
import { useState } from "react";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask =() => {
    console.log("Before", tasks);
    console.log("NewTask:", newTask)
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    console.log("After:", updatedTasks);
    setNewTask('');
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Task Board</h1>

      <div className="flex gap-2 mb-4">
        <input
        className="border p-2 flex-1"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <TaskList tasks={tasks} />
    </main>
  );
}