import './style.css';
import interact from 'interactjs';


let today = new Date();
let options = { weekday: 'short', month: 'short', day: 'numeric' };
let formattedDate = today.toLocaleDateString('en-US', options);

document.getElementById('date').textContent = formattedDate;

//unction to create a new to-do item
function createToDoItem(id, taskName) {
  const item = document.createElement('li');
  item.classList.add('todo-item', 'flex', 'items-center', 'justify-between', 'gap-16', 'bg-slate-50', 'p-4', 'rounded-[20px]', 'shadow-md', 'mb-2');
  item.setAttribute('id', id);

  item.innerHTML = `
    <input type="checkbox" class="todo-checkbox h-5 w-5 mr-3">
    <span class="todo-text font-caveat text-[35px]">${taskName}</span>
    <button class="todo-delete bg-red-100 font-caveat font-[30px] text-red-500 px-2 py-1 rounded-full">X</button>
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
        restriction: '#todo-list',
        endOnly: true
      })
    ],
    listeners: {
      move: dragMoveListener,
    },
    onend: function(event) {
      const target = event.target;
      //target.style.transition = 'transform 0.5s';
      target.style.transform = 'translate(0, 0)';
    }
  });
}

// "Add Task" listener
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
    const closestItem = document.elementFromPoint(event.dragEvent.clientX, event.dragEvent.clientY).closest('.todo-item');

    if(closestItem) {
      dropzoneElement.insertBefore(draggableElement, closestItem);
    } else{
      dropzoneElement.appendChild(draggableElement);
    }

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
  console.log(x, y);
  console.log(event.dx, event.dy);
  console.log(target.getAttribute('data-x'), target.getAttribute('data-y'));

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

