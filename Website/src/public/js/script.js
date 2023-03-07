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
		document.querySelector(
			'#' + id + ' .fileheader',
		).onmousedown = dragMouseDown;
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

function openWindow(name, content) {
	const htmlOfTerminal = `
	<div class="terminal" style="display:none">
	<div class="appheader">
	<div class="terminalheader"></div>
	  <p class="title">Terminal</p>
	  <div class="buttons">
		<div class="button" id="max_min"><img src="/imgs/window-maximize.svg" alt=""></div>
		<div class="button" id="close"><img src="/imgs/x-thin.svg" alt=""></div>
	</div>
  </div>
  <span>$</span> <input type="text" class="input" placeholder="Enter command...">
	`;
	switch (name) {
	case 'terminal':
		$('.bg').append(htmlOfTerminal);
		$('.terminal').fadeIn(200);
		$('#close').on('click', () => {
			$('.terminal').fadeOut(200);
			setTimeout(() => {
				$('.terminal').remove();
			}, 200);
		});
		$('#max_min').on('click', () => {
			$('.terminal').toggleClass('maximized');
		});
		break;
	}
}

function changeWindowState() {

}
