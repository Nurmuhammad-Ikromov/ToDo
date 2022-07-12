const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

const elBtn1 = document.querySelector('.btn-all');
const elBtn2 = document.querySelector('.btn-comp');
const elBtn3 = document.querySelector('.btn-uncomp');
const elCompletedBtn = document.querySelector('.complated');
const elUnCompletedBtn = document.querySelector('.uncomplated');
const elAllBtn = document.querySelector('.all');
const elMarkList = document.querySelector('.js-mark-list');
const elMarkBoxTitle = document.querySelector('.mark-box-title')
const al = false;
const todos = [];
const bookMark = [];
const localList = JSON.parse(window.localStorage.getItem("arr"));
const localMarkList = JSON.parse(window.localStorage.getItem("mark"));

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-check')) {
		var checkId = evt.target.dataset.todoId;

		var findCheck = localList.find((el) => el.id == checkId);
		findCheck.isComplete = !findCheck.isComplete;

		createItem(localList, elList);
	}

	if (evt.target.matches('.js-btn')) {
		let delId = evt.target.dataset.todoId;

		let findedItem = localList.findIndex((el) => el.id == delId);
		localList.splice(findedItem, 1);
		createItem(localList, elList);
	}

	if (evt.target.matches('.js-mark-btn')) {
		let markId = evt.target.dataset.todoId;
		elMarkList.innerHTML = '';
		let findMarkItem = localList.find((el) => el.id == markId);
		
		bookMark.push(findMarkItem);
		window.localStorage.setItem("mark", JSON.stringify(bookMark))
		createItem(bookMark, elMarkList);
		createItem(localList, elList);
		
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
	window.localStorage.setItem('arr', JSON.stringify(todos))
	createItem(todos, elList);
	elInput.value = '';
	// window.location.reload()
});

const createItem = (array, list) => {
	elList.innerHTML = '';
	elBtn1.textContent = localList.length;
	elBtn2.textContent = localList.filter((e) => e.isComplete).length;
	elBtn3.textContent = localList.filter((e) => !e.isComplete).length;
	array.forEach((todo) => {
		var NewItem = document.createElement('li');
		var NewCheck = document.createElement('input');
		var NewBtn = document.createElement('button');
		var NewMarkBtn = document.createElement('button');
		var NewTxt = document.createElement('p');
		NewCheck.setAttribute('type', 'checkbox');
		NewCheck.setAttribute('class', 'js-check');
		NewItem.setAttribute('class', 'js-item');
		NewBtn.setAttribute('class', 'js-btn');
		NewMarkBtn.setAttribute('class', 'js-mark-btn');
		NewTxt.setAttribute('class', 'js-text');
		NewBtn.textContent = 'Delete';
		NewMarkBtn.textContent = '🔖';
		NewCheck.dataset.todoId = todo.id;
		NewBtn.dataset.todoId = todo.id;
		NewMarkBtn.dataset.todoId = todo.id;
		NewItem.appendChild(NewCheck);
		NewItem.appendChild(NewTxt);
		NewItem.appendChild(NewBtn);
		NewItem.appendChild(NewMarkBtn);
		NewTxt.textContent = todo.name;
		list.appendChild(NewItem);

		if (todo.isComplete) {
			NewTxt.style.textDecoration = 'line-through';
			NewCheck.checked = true;
		}
	});
};
createItem(localMarkList, elMarkList)
createItem(localList, elList)


elCompletedBtn.addEventListener('click', function (evt) {
	evt.preventDefault();
	NewItem = localList.filter((e) => e.isComplete);
	createItem(NewItem, elList);
});

elUnCompletedBtn.addEventListener('click', function (evt) {
	evt.preventDefault();
	NewItem = localList.filter((e) => !e.isComplete);
	createItem(NewItem, elList);
});

elAllBtn.addEventListener('click', function (evt) {
	evt.preventDefault();
	createItem(localList, elList);
});
