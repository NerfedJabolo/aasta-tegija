function dragElement(id) {
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;
	const file = document.getElementById(id); // get the file element
	const fileHeader = file.querySelector('.fileheader'); // get the fileheader element
	let fileBackgroundColor = ''; // variable to store the file border color

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
	dragElement(files[i].id);
}
