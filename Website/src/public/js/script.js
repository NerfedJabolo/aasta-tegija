/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function dragElement(id) {
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;
	// get the file element
	const file = document.getElementById(id);
	// get the fileheader element
	const fileHeader = file.querySelector('.fileheader');
	// variable to store the file border color
	let fileBackgroundColor = '';

	console.log(file.classList.item(0));

	if (document.querySelector('#' + id + ' .fileheader')) {
		// if present, the header is where you move the DIV from:
		document.querySelector('#' + id + ' .fileheader').onmousedown =
      dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		fileHeader.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;

		// set the file border color to red
		fileBackgroundColor = file.style.backgroundColor;
		file.style.backgroundColor = 'rgba(211, 211, 211, 0.5)';

		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		// calculate the new file position:
		const newFileTop = file.offsetTop - pos2;
		const newFileLeft = file.offsetLeft - pos1;

		// check if the file is inside the screen
		if (
			newFileTop >= 0 &&
      newFileLeft >= 0 &&
      newFileTop + file.offsetHeight <= window.innerHeight &&
      newFileLeft + file.offsetWidth <= window.innerWidth
		) {
			// set the file's new position:
			file.style.top = newFileTop + 'px';
			file.style.left = newFileLeft + 'px';
		}
	}

	function closeDragElement() {
		// reset the file border color
		file.style.backgroundColor = fileBackgroundColor;

		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

// Make the file elements draggable:
const files = document.getElementsByClassName('file');
for (let i = 0; i < files.length; i++) {
	const file = files[i];
	if (i !== 0) {
		file.style.top = 70 * i + 'px';
	}
	dragElement(file.id);
}

function openWindow(name) {
	switch (name) {
	case 'terminal': {
		const id = randomStringGen();
		const uniqueClass = 'terminal ' + id;
		const htmlOfTerminal = `
	<div class="${uniqueClass}" id="${id}" style="display:none">
	<div class="${id} appheader">
	<div class="terminalheader"></div>
	  <p class="title">Terminal</p>
	  <div class="buttons">
		<div class="button" id="${id} max_min"><img src="/imgs/window-maximize.svg" alt=""></div>
		<div class="button" id="${id} close"><img src="/imgs/x-thin.svg" alt=""></div>
	</div>
  </div>
  <span>$</span> <input type="text" class="input" placeholder="Enter command...">
	`;

		$('.bg').append(htmlOfTerminal);
		$(`#${id}`).fadeIn(200);
		const terminal = document.getElementById(id);
		terminal.style.display = 'block';
		dragWindow(terminal.id, `.${id}`);
		$(`#${id}\\ close`).on('click', () => {
			$(`#${id}`).fadeOut(200);
			setTimeout(() => {
				$(`#${id}`).remove();
			}, 200);
		});
		$(`#${id}\\ max_min`).on('click', () => {
			console.log('maximize');
			if ($(`#${id}`).hasClass('maximized')) {
				$(`#${id}`).removeClass('maximized');
				$(`#${id}\\ max_min img`).attr('src', '/imgs/window-maximize.svg');
				$(`#${id}`).css({
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				});
			} else {
				$(`#${id}`).addClass('maximized');
				$(`#${id}\\ max_min img`).attr('src', '/imgs/window-restore.svg');
				$(`#${id}`).css({
					top: 0,
					left: 0,
					transform: 'none',
				});
			}
		});
		break;
	}
	case 'õpetus': {
		createWindow({ windowTitle: 'Õpetus', tutorialPage: true });


		break;
	}
	case 'python': {
		createWindow({ windowTitle: 'Python', windowFileContent: 'print("Hello World!")' });
		break;
	}
	}


	async function createWindow({ windowTitle, windowFileContent, additonalHTML, tutorialPage } = {}) {
		const id = randomStringGen();
		const response = await fetch('/api/0');
		const data = await response.json();
		const firstPageContent = data.content;
		const uniqueClass = 'app ' + id;
		const htmlOfTerminal = `
	<div class="${uniqueClass}" id="${id}" style="display:none">
	<div class="${id} appheader">
	<div class="terminalheader"></div>
	  <p class="title">${windowTitle}</p>
	  <div class="buttons">
		<div class="button" id="${id} max_min"><img src="/imgs/window-maximize.svg" alt=""></div>
		<div class="button" id="${id} close"><img src="/imgs/x-thin.svg" alt=""></div>
	</div>
  </div>
  <br>
  <br> 

  ${tutorialPage ? `<p id="${id}" >${firstPageContent}</p>` : '<iframe src="https://trinket.io/embed/python/6c547a092f" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>'}
  
    ${tutorialPage ? `<button id="${id} move_page_button">Edasi</button>` : ''}
  `;

		// .jqconsole > span:nth-child(3) > span:nth-child(1)

		$('.bg').append(htmlOfTerminal);
		$(`#${id}`).fadeIn(200);
		const appElement = document.getElementById(id);
		appElement.style.display = 'block';
		dragWindow(appElement.id, `.${id}`);
		$(`#${id}\\ close`).on('click', () => {
			$(`#${id}`).fadeOut(200);
			setTimeout(() => {
				$(`#${id}`).remove();
			}, 200);
		});
		let i = 1;
		$(`#${id}\\ move_page_button`).on('click', async () => {
			console.log('move page');

			const res = await fetch(`/api/${i++}`);
			const data = await res.json();
			// #GTdzW\ text
			$(`#${id} p`).text(data.content);
			console.log(data);
		});
		$(`#${id}\\ max_min`).on('click', () => {
			console.log('maximize');
			if ($(`#${id}`).hasClass('maximized')) {
				$(`#${id}`).removeClass('maximized');
				$(`#${id}\\ max_min img`).attr('src', '/imgs/window-maximize.svg');
				$(`#${id}`).css({
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				});
			} else {
				$(`#${id}`).addClass('maximized');
				$(`#${id}\\ max_min img`).attr('src', '/imgs/window-restore.svg');
				$(`#${id}`).css({
					top: 0,
					left: 0,
					transform: 'none',
				});
			}
		});
	}
}

function dragWindow(elementId, handleId) {
	console.log(handleId, elementId);
	let currentWindow = null;
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;
	const handle = document.querySelector(handleId);
	const element = document.getElementById(elementId);

	handle.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;

		// Keep track of the current window being dragged
		currentWindow = element;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		// Only apply the dragging to the current window
		if (currentWindow !== null && currentWindow === element) {
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			element.style.top = element.offsetTop - pos2 + 'px';
			element.style.left = element.offsetLeft - pos1 + 'px';
		}
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;

		// Reset the current window being dragged
		currentWindow = null;
	}
}

function randomStringGen() {
	const length = 5;
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let retVal = '';
	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}
