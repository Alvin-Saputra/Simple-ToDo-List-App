import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const usersCollectionRef = collection(db, 'task');

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  const createTask = async () => {
    const docRef = await addDoc(usersCollectionRef, { task: newTask });
    setTasks([...tasks, { id: docRef.id, task: newTask }]);
    setNewTask('');
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, 'task', id);
    await deleteDoc(taskDoc);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(usersCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen items-center p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-slate-100">To-Do List</h1>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-from-indigo-500 to-pink-500 w-3/4"
          />
          <button
            className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-from-indigo-500 to-pink-500 w-1/4"
            onClick={createTask}
          >
            Add
          </button>
        </div>
        <ol className="list-decimal list-inside">
          {tasks.map((taskdata) => (
            <li key={taskdata.id} className="flex justify-between items-center mb-5 mt-5 border-solid bg-gradient-to-r from-slate-800 to-slate-700">
              <span className="text-lg text-slate-100 w-3/4">{taskdata.task}</span>
              <button
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-1/4"
                onClick={() => deleteTask(taskdata.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ToDoList;
