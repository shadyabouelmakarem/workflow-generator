export const draggable = {
  mounted(el: HTMLElement) {
    dragElement(el);
  },
};
function dragElement(element: HTMLElement) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  element.onmousedown = (e) => dragMouseDown(e, element);

  function dragMouseDown(e: MouseEvent, element: HTMLElement) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = () => closeDragElement(element);
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    let newTop = element.offsetTop - pos2;
    let newLeft = element.offsetLeft - pos1;

    // Get the .drag-container element
    const dragContainer = element.closest(".drag-container") as HTMLElement;
    if (dragContainer) {
      // Check if the new position is within the bounds of the .drag-container
      const maxTop = dragContainer.offsetHeight - element.offsetHeight;
      const maxLeft = dragContainer.offsetWidth - element.offsetWidth;
      if (newTop > maxTop) {
        newTop = maxTop;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      if (newLeft > maxLeft) {
        newLeft = maxLeft;
      }
      if (newLeft < 0) {
        newLeft = 0;
      }
    }

    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";
  }

  function closeDragElement(element: HTMLElement) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    // emmits that dragging is stopped
    element.dispatchEvent(
      new CustomEvent("draggingStopped", { detail: element })
    );
  }
}
