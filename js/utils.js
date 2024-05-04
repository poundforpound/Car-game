function hasCollision(el1Info, el2Info) {
  // X is on center of the page that X calculate another way
  const carYTop = el1Info.coordinate.y;
  const carYBottom = el1Info.coordinate.y + el1Info.height;
  const carXLeft = el1Info.coordinate.x - el1Info.widthHalf;
  const carXRight = el1Info.coordinate.x + el1Info.widthHalf;

  const coinYTop = el2Info.coordinate.y;
  const coinYBottom = el2Info.coordinate.y + el2Info.height;
  const coinXLeft = el2Info.coordinate.x - el2Info.widthHalf;
  const coinXRight = el2Info.coordinate.x + el2Info.widthHalf;

  if (carYTop > coinYBottom || carYBottom < coinYTop) {
    return false;
  }
  if (carXLeft > coinXRight || carXRight < coinXLeft) {
    return false;
  }
  return true;
}

function getCoord(element) {
  const matrix = window.getComputedStyle(element).transform;
  const arrayOfCoordinate = matrix.split(',');
  const y = arrayOfCoordinate[arrayOfCoordinate.length - 1];
  const x = arrayOfCoordinate[arrayOfCoordinate.length - 2];
  const coordY = parseFloat(y);
  const coordX = parseFloat(x);
  return { x: coordX, y: coordY };
}

function createElementInfo(el) {
  return {
    widthHalf: el.clientWidth / 2,
    height: el.clientHeight,
    coordinate: getCoord(el),
    visible: true,
    ignoreAppearance: false,
  };
}
