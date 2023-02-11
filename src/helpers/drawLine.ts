interface Point {
  x: number;
  y: number;
}

export const drawLine = (
  elementASelector: string,
  elementBSelector: string
) => {
  const workflowContainer = document.querySelector<HTMLElement>(
    ".workflow-container"
  );

  // select output connector
  const elementARect = document
    .querySelector(`[data-output-connector="${elementASelector}"]`)
    ?.getBoundingClientRect();

  // select input connector
  const elementBRect = document
    .querySelector(`[data-input-connector="${elementBSelector}"]`)
    ?.getBoundingClientRect();

  if (elementARect && elementBRect && workflowContainer) {
    const workflowContainerRect = workflowContainer.getBoundingClientRect();

    // calculate line starting point position related to workflow container
    const startingPoint: Point = { x: 0, y: 0 };
    startingPoint.x =
      elementARect.left + // spacebetween the left side of the element and the start of the viewport
      elementARect.width - // add element width so that the line starts from the connector tip
      // subtract the distance between the start of the workflow container (with left border width added) and the viewport
      (workflowContainerRect.left + 2);

    startingPoint.y =
      elementARect.top + // spacebetween the top side of the element and the start of the viewport
      elementARect.height / 2 - // add half the element height so that the line ends at the center of left side of the element
      // subtract the distance between the start of the workflow container (with top border width added) and the viewport
      (workflowContainerRect.top + 2);

    // calculate line starting point position related to workflow container
    const endingPoint: Point = { x: 0, y: 0 };
    endingPoint.x = elementBRect.left - (workflowContainerRect.left + 2);
    endingPoint.y =
      elementBRect.top +
      elementBRect.height / 2 -
      (workflowContainerRect.top + 2);

    // calculate length and angle of the connection
    const angle = calculateAngle(startingPoint, endingPoint);

    // create line element
    const newConnection = document.createElement("span");
    newConnection.setAttribute(
      "data-node-connection",
      `${elementASelector}-${elementBSelector}`
    );
    newConnection.className = "node-connection";
    // set line starting x position related to workflow container
    newConnection.style.left = `${startingPoint.x}px`;
    // set line starting y position related to workflow container
    newConnection.style.top = `${startingPoint.y}px`;
    // set line length
    newConnection.style.width =
      Math.sqrt(
        Math.pow(endingPoint.x - startingPoint.x, 2) +
          Math.pow(endingPoint.y - startingPoint.y, 2)
      ) + "px";
    // set rotation degree
    newConnection.style.transform = `rotate(${angle}deg)`;

    workflowContainer.appendChild(newConnection);
  }
};

function calculateAngle(startingPoint: Point, endingPoint: Point) {
  return (
    (Math.atan2(
      endingPoint.y - startingPoint.y,
      endingPoint.x - startingPoint.x
    ) *
      180) /
    Math.PI
  );
}

function calculateDistance(e1: DOMRect, e2: DOMRect) {
  const adjacent = Math.abs(e1.left - e2.left);
  const opposite = Math.abs(e1.top - e2.top);
  const res = Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
  return res;
}
