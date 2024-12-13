import React, { useState, useEffect } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAdd, onCancel }) => {
  const [urgency, setUrgency] = useState('');
  const [importance, setImportance] = useState('');
  const [description, setDescription] = useState('');

  // Automatically set urgency and importance based on specific task descriptions
  useEffect(() => {
    const input = description.trim().toLowerCase();

    if (input === 'finish iui report') {
      setUrgency('high');
      setImportance('high');
    } else if (input === 'book train home') {
      setUrgency('low');
      setImportance('high');
    } else if (input === 'clean bathroom') {
      setUrgency('mid');
      setImportance('mid');
    } else if (input === 'workout') {
      setUrgency('mid');
      setImportance('high');
    } else if (input === 'cancel netflix') {
      setUrgency('low');
      setImportance('low');
    } else if (input === 'call Anton') {
      setUrgency('high');
      setImportance('mid');
    } else {
      //setUrgency('');
      //setImportance('');
    }    
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== '' && urgency && importance) {
      const quadrant = `${urgency}${importance.charAt(0).toUpperCase() + importance.slice(1)}`;
      onAdd(quadrant, description);
    }
  };

  return (
    <div className="task-input-screen">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="task-input-options">
          <fieldset>
            <legend>Urgency</legend>
            <label>
              <input
                type="radio"
                name="urgency"
                value="high"
                checked={urgency === 'high'}
                onChange={(e) => setUrgency(e.target.value)}
              />
              High
            </label>
            <label>
              <input
                type="radio"
                name="urgency"
                value="mid"
                checked={urgency === 'mid'}
                onChange={(e) => setUrgency(e.target.value)}
              />
              Mid
            </label>
            <label>
              <input
                type="radio"
                name="urgency"
                value="low"
                checked={urgency === 'low'}
                onChange={(e) => setUrgency(e.target.value)}
              />
              Low
            </label>
          </fieldset>

          <fieldset>
            <legend>Importance</legend>
            <label>
              <input
                type="radio"
                name="importance"
                value="high"
                checked={importance === 'high'}
                onChange={(e) => setImportance(e.target.value)}
              />
              High
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="mid"
                checked={importance === 'mid'}
                onChange={(e) => setImportance(e.target.value)}
              />
              Mid
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="low"
                checked={importance === 'low'}
                onChange={(e) => setImportance(e.target.value)}
              />
              Low
            </label>
          </fieldset>
        </div>

        <label>
          Task Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </label>

        <div className="task-input-actions">
          <button type="submit" disabled={!urgency || !importance || !description.trim()}>
            Add Task
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
