function elementAnimation(element, elementInfo, y, speed) {
  let newCoordY = elementInfo.coordinate.y + speed;
  let newCoordX = elementInfo.coordinate.x;
  if (newCoordY > window.innerHeight) {
    newCoordY = -y;
    let direction = parseInt(Math.random() * 2);
    let randomX = parseInt(Math.random() * (roadWidthHalf + 1 - elementInfo.widthHalf));
    newCoordX = direction === 0 ? -randomX : randomX;
    if (!elementInfo.ignoreAppearance) {
      elementInfo.visible = true;
      element.style.display = 'initial';
    }
  }
  elementInfo.coordinate.x = newCoordX;
  elementInfo.coordinate.y = newCoordY;
  element.style.transform = `translate(${newCoordX}px,${newCoordY}px)`;
}
