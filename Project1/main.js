import './style.css';
import interact from 'interactjs';

// Function to create a new to-do item
function createToDoItem(id, taskName) {
  const item = document.createElement('li');
  item.classList.add('todo-item', 'flex', 'items-center', 'justify-between', 'gap-8', 'bg-slate-50', 'p-4', 'rounded-lg', 'shadow-md', 'mb-2');
  item.setAttribute('id', id);

  item.innerHTML = `
    <input type="checkbox" class="todo-checkbox h-5 w-5 mr-3">
    <span class="todo-text">${taskName}</span>
    <button class="todo-delete bg-red-100 font-medium text-red-500 px-2 py-1 rounded-full">X</button>
  `;

  //delete button
  item.querySelector('.todo-delete').addEventListener('click', function() {
    item.remove();
  });

  return item;
}

// Function to add a new to-do item
function addToDoItem(taskName) {
  const list = document.getElementById('todo-list');
  if(!list) {
    console.error('To-do list not found');
    return;
  }
  // create item with date as id to keep it unique
  const item = createToDoItem(Date.now(), taskName);
  //console.log(item);
  list.appendChild(item);

  //draggable
  interact('.todo-item').draggable({
    inertia: false,
    modifiers: [
      interact.modifiers.restrict({
        restriction: '#todo-list',  // Prevent dragging outside the todo list area
        endOnly: true
      })
    ],
    onmove: dragMoveListener,
    onend: function(event) {
      const target = event.target;
      target.style.transition = 'transform 0.5s';
      target.style.transform = 'translate(0, 0)';
    }
  });
}

// Event listener for the "Add Task" button
document.getElementById('add-todo').addEventListener('click', function() {
  const taskName = prompt('Enter a task:');
  if (taskName) {
    addToDoItem(taskName);
  }
});

// Drag-and-drop 
interact('#todo-list').dropzone({
  accept: '.todo-item',
  overlap: 0.75,
  ondrop: function(event) {
    const draggableElement = event.relatedTarget;
    const dropzoneElement = event.target;
    dropzoneElement.appendChild(draggableElement);

    //reset position
    draggableElement.style.transform = 'translate(0, 0)';
    draggableElement.setAttribute('data-x', 0);
    draggableElement.setAttribute('data-y', 0);
  }
});

// Move event handler for draggable elements
function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

