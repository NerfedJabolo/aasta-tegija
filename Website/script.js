// Make the DIV element draggable:
dragElement(document.getElementsByClassName('file')[0]);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var fileHeader = elmnt.getElementsByClassName('fileheader')[0];

  fileHeader.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    // set the element's new position:
    var newX = elmnt.offsetLeft - pos1;
    var newY = elmnt.offsetTop - pos2;
    if (
      newX > 0 &&
      newY > 0 &&
      newX + elmnt.offsetWidth < window.innerWidth &&
      newY + elmnt.offsetHeight < window.innerHeight
    ) {
      elmnt.style.left = newX + 'px';
      elmnt.style.top = newY + 'px';
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
