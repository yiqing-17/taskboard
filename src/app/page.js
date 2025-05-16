'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [nextId, setNextId] = useState(1);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []);

  const addTask =() => {
    console.log("Before", tasks);
    console.log("NewTask:", newTask)
    const newTaskObj = {
      id: nextId,
      task: newTask,
      descraption: '',
    };
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    console.log("After:", updatedTasks);
    setNewTask('');

    setNextId(nextId + 1);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  return (
    <main className="p-4 max-w-md mx-auto">
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

      <TaskList tasks={tasks} onDelete={handleDelete}/>
    </main>
  );
}