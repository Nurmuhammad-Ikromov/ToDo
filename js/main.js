const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const elBtn1 = document.querySelector('.btn-all');
const elBtn2 = document.querySelector('.btn-comp');
const elBtn3 = document.querySelector('.btn-uncomp');
const al = false;
const todos = [];

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-check')) {
		var checkId = evt.target.dataset.todoId;

		var findCheck = todos.find((el) => el.id == checkId);
		findCheck.isComplete = !findCheck.isComplete;

		createItem(todos, elList);
	}

	if (evt.target.matches('.js-btn')) {
		let delId = evt.target.dataset.todoId;

		let findedItem = todos.findIndex((el) => el.id == delId);
		todos.splice(findedItem, 1);

		createItem(todos, elList);
	}
});

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	elList.innerHTML = '';
	let elInputVal = elInput.value;
	let obj = {
		id: todos.length ? todos[todos.length - 1].id + 1 : 0,
		name: elInputVal,
		isComplete: false,
	};

	todos.push(obj);

	createItem(todos, elList);
	elInput.value = '';
});

const createItem = (array, list) => {
	elList.innerHTML = '';
	let count = 0;
	array.forEach((todo) => {
		var NewItem = document.createElement('li');
		var NewCheck = document.createElement('input');
		var NewBtn = document.createElement('button');
		var NewTxt = document.createElement('p');
		NewCheck.setAttribute('type', 'checkbox');
		NewCheck.setAttribute('class', 'js-check');
		NewItem.setAttribute('class', 'js-item');
		NewBtn.setAttribute('class', 'js-btn');
		NewTxt.setAttribute('class', 'js-text');
		NewBtn.textContent = 'Delete';
		NewCheck.dataset.todoId = todo.id;
		NewBtn.dataset.todoId = todo.id;
		NewItem.appendChild(NewCheck);
		NewItem.appendChild(NewTxt);
		NewItem.appendChild(NewBtn);
		NewTxt.textContent = todo.name;
		list.appendChild(NewItem);

		if (todo.isComplete) {
			NewTxt.style.textDecoration = 'line-through';
			NewCheck.checked = true;
			count++;
		}

		elBtn1.textContent = array.length;
		elBtn2.textContent = count;
		elBtn3.textContent = array.length - count;
	});
};
