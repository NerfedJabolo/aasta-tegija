function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var file = elmnt[0]; // get the file element
  var fileHeader = file.querySelector('.fileheader'); // get the fileheader element
  var fileBackgroundColor = ''; // variable to store the file border color

  console.log(file.classList.item(0));

  if (document.querySelector('.' + file.classList.item(0) + 'header')) {
    // if present, the header is where you move the DIV from:
    document.querySelector(
      '.' + file.classList.item(0) + 'header'
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
    var newFileTop = file.offsetTop - pos2;
    var newFileLeft = file.offsetLeft - pos1;

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

// Make the file element draggable:
dragElement(document.getElementsByClassName('file'));
