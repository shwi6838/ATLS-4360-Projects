import './style.css';
import interact from 'interactjs';


let today = new Date();
let options = { weekday: 'short', month: 'short', day: 'numeric' };
let formattedDate = today.toLocaleDateString('en-US', options);

document.getElementById('date').textContent = formattedDate;

//unction to create a new to-do item
function createToDoItem(id, taskName) {
  const item = document.createElement('li');
  item.classList.add('todo-item', 'flex', 'items-center', 'justify-between', 'gap-16', 'bg-slate-50', 'p-4', 'rounded-[20px]', 'shadow-md', 'mb-5');
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
      end: function(event) {
        const target = event.target;
        // const list = document.getElementById('todo-list');
        // const items = Array.from(list.querySelectorAll('.todo-item'));

        target.style.transform = '';
        target.removeAttribute('data-x');
        target.removeAttribute('data-y');

        // let inserted = false;
        // items.forEach((item) => {
        //   const rect = item.getBoundingClientRect();
        //   if (draggedItem !== item && event.clientY > rect.top && event.clientY < rect.bottom) {
        //     // Insert dragged item before the current item
        //     if (event.clientY < rect.top + rect.height / 2) {
        //       list.insertBefore(draggedItem, item);
        //     } else {
        //       list.insertBefore(draggedItem, item.nextSibling);
        //     }
        //     inserted = true;
        //   }
        // });
        // if (!inserted) {
        //   list.appendChild(draggedItem);
        // }
      }
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

// // Define dropzone
interact('#todo-list').dropzone({
  accept: '.todo-item',
  overlap: 0.5,
  ondrop(event) {
    const dragElement = event.relatedTarget;
    const dropzone = event.target;
    const ul = document.getElementById('todo-list');
    const targetIndex = Array.from(ul.children).indexOf(dropzone);
    const draggedIndex = Array.from(ul.children).indexOf(dragElement);

    // Swap items in the list if necessary
    if (targetIndex !== draggedIndex) {
      ul.insertBefore(dragElement, ul.children[targetIndex]);
    }
    // reset position
    dragElement.style.transform = '';
    dragElement.setAttribute('data-x', 0);
    dragElement.setAttribute('data-y', 0);
  }
});

// Move event handler for draggable elements
function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  // console.log(x, y);
  // console.log(event.dx, event.dy);
  // console.log(target.getAttribute('data-x'), target.getAttribute('data-y'));

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// find the closest item
    // const closestItem = document.elementFromPoint(event.dragEvent.clientX, event.dragEvent.clientY).closest('.todo-item'); 
    // // insert before or after the closest item
    // if (closestItem && closestItem !== draggableElement) {
    //   const draggableRect = draggableElement.getBoundingClientRect();
    //   const closestItemRect = closestItem.getBoundingClientRect();
    //   const insertBefore = draggableRect.top < closestItemRect.top;
    //   if (insertBefore) {
    //     dropzoneElement.insertBefore(draggableElement, closestItem);
    //   } else {
    //     dropzoneElement.insertBefore(draggableElement, closestItem.nextSibling);
    //   }
    // } else {
    //   dropzoneElement.appendChild(draggableElement); // add to the end if nothing is found
    // }
    // Find the index of the dragged item and the drop target