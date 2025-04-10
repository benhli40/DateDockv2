// tasks.js
import { saveAllTasks, loadSavedTasks } from './storage.js';
import { makeTaskDraggable } from './dragdrop.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage or fallback
  loadAllTasks();

  // Setup add-task buttons
  document.querySelectorAll('.add-task-btn').forEach(button => {
    button.addEventListener('click', () => {
      handleAddTask(button.dataset.day);
    });
  });

  // Add "Enter" key functionality for all text inputs
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const day = input.id.replace('input-', '');
        handleAddTask(day);
      }
    });
  });
});

function handleAddTask(day) {
  const input = document.getElementById(`input-${day}`);
  const text = input.value.trim();

  if (text) {
    const task = createTaskElement(text, false);
    document.getElementById(`list-${day}`).appendChild(task);
    input.value = '';
    saveAllTasks();
  }
}

export function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.classList.add('added'); // trigger animation on add
  li.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = completed;

  checkbox.addEventListener('change', () => {
    li.style.opacity = checkbox.checked ? '0.5' : '1';
    saveAllTasks();
  });

  const span = document.createElement('span');
  span.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.className = 'delete-task';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveAllTasks();
  });

  li.style.opacity = completed ? '0.5' : '1';
  li.append(checkbox, span, delBtn);
  makeTaskDraggable(li);
  return li;
}

function loadAllTasks() {
  const saved = loadSavedTasks();

  if (saved) {
    Object.entries(saved).forEach(([day, tasks]) => {
      const list = document.getElementById(`list-${day}`);
      tasks.forEach(taskObj => {
        const task = createTaskElement(taskObj.text, taskObj.completed);
        list.appendChild(task);
      });
    });
  } else {
    fetch('data/days.json')
      .then(res => res.json())
      .then(seed => {
        Object.entries(seed).forEach(([day, tasks]) => {
          const list = document.getElementById(`list-${day}`);
          tasks.forEach(text => {
            const task = createTaskElement(text); // fallback uses just text
            list.appendChild(task);
          });
        });
        saveAllTasks(); // seed to localStorage
      })
      .catch(err => console.error("Could not load fallback days.json:", err));
  }
}