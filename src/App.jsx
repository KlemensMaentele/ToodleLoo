import React, { useState } from 'react';
import './App.css';
import Task from './components/Task';
import Matrix from './components/Matrix';
import TaskInput from './components/TaskInput';

const App = () => {
  const [matrix, setMatrix] = useState(new Matrix());
  const [showTaskInput, setShowTaskInput] = useState(false);

  const addTaskToMatrix = (quadrant, description) => {
    const newTask = new Task(quadrant, description);
    const updatedMatrix = new Matrix([...matrix.taskList, newTask]);
    setMatrix(updatedMatrix);
    setShowTaskInput(false);
  };

  const deleteTaskFromMatrix = (quadrant, description) => {
    const updatedTasks = matrix.taskList.filter(
      (task) => !(task.quadrant === quadrant && task.description === description)
    );
    setMatrix(new Matrix(updatedTasks));
  };

  const renderTasks = (quadrantKey) => (
    <ul>
      {matrix.getTasksForQuadrant(quadrantKey).map((task, index) => (
        <li key={index}>
          {task.description}
          <button
            className="delete-task-button"
            onClick={() => deleteTaskFromMatrix(quadrantKey, task.description)}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );

  const renderQuadrant = (title, quadrantKey) => (
    <div className={`quadrant ${quadrantKey}`}>
      <h3>{title}</h3>
      {renderTasks(quadrantKey)}
    </div>
  );
  return (
    <div className="app">
      <h1>3x3 Eisenhower Matrix</h1>
      {showTaskInput ? (
        <TaskInput onAdd={addTaskToMatrix} onCancel={() => setShowTaskInput(false)} />
      ) : (
        <>
          <button className="add-task-main-button" onClick={() => setShowTaskInput(true)}>
            Add Task
          </button>
          <div className="matrix grid-3x3">
            {renderQuadrant('High Urgency & High Importance', 'highHigh')}
            {renderQuadrant('High Urgency & Mid Importance', 'highMid')}
            {renderQuadrant('High Urgency & Low Importance', 'highLow')}
            {renderQuadrant('Mid Urgency & High Importance', 'midHigh')}
            {renderQuadrant('Mid Urgency & Mid Importance', 'midMid')}
            {renderQuadrant('Mid Urgency & Low Importance', 'midLow')}
            {renderQuadrant('Low Urgency & High Importance', 'lowHigh')}
            {renderQuadrant('Low Urgency & Mid Importance', 'lowMid')}
            {renderQuadrant('Low Urgency & Low Importance', 'lowLow')}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
