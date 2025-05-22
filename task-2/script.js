
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');


const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');


function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}   
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        nameError.textContent = 'Name must be at least 2 characters long';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    
    if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    

    if (!validateMessage(messageInput.value)) {
        messageError.textContent = 'Message must be at least 10 characters long';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    if (isValid) {
        alert('Form submitted successfully!');
        contactForm.reset();
    }
});


const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');


let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(li);
    });
    

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });
    });
}


addTodoBtn.addEventListener('click', function() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
});


const imageUrlInput = document.getElementById('imageUrl');
const addImageBtn = document.getElementById('addImage');
const galleryGrid = document.getElementById('galleryGrid');


let images = JSON.parse(localStorage.getItem('images')) || [];


function renderGallery() {
    galleryGrid.innerHTML = '';
    images.forEach((imageUrl, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${imageUrl}" alt="Gallery image">
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        galleryGrid.appendChild(div);
    });
    
    
    document.querySelectorAll('.gallery-item .delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            images.splice(index, 1);
            localStorage.setItem('images', JSON.stringify(images));
            renderGallery();
        });
    });
}

addImageBtn.addEventListener('click', function() {
    const imageUrl = imageUrlInput.value.trim();
    if (imageUrl) {
        // Validate image URL
        const img = new Image();
        img.onload = function() {
            images.push(imageUrl);
            localStorage.setItem('images', JSON.stringify(images));
            imageUrlInput.value = '';
            renderGallery();
        };
        img.onerror = function() {
            alert('Invalid image URL. Please enter a valid image URL.');
        };
        img.src = imageUrl;
    }
});

renderTodos();
renderGallery(); 