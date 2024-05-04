function carMoveToTop(car, carInfo) {
  return () => {
    const coordY = carInfo.coordinate.y;
    const newCoordY = coordY - 3;
    if (newCoordY < 0) {
      return;
    }
    carInfo.coordinate.y = newCoordY;
    carMove(car, carInfo.coordinate.x, newCoordY);
    // car.style.transform = `translate(${carInfo.coordinate.x}px,${newCoordY}px)`;
    carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
  };
}
function carMoveToBottom(car, carInfo) {
  return () => {
    const coordY = carInfo.coordinate.y;
    const newCoordY = coordY + 3;
    if (newCoordY + carInfo.height > roadHeight) {
      return;
    }
    carInfo.coordinate.y = newCoordY;
    carMove(car, carInfo.coordinate.x, newCoordY);
    // car.style.transform = `translate(${carInfo.coordinate.x}px,${newCoordY}px)`;
    carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo));
  };
}
function carMoveToLeft(car, carInfo) {
  return () => {
    const coordX = carInfo.coordinate.x;
    const newCoordX = coordX - 3;
    if (newCoordX < -roadWidthHalf + carInfo.widthHalf) {
      return;
    }
    carInfo.coordinate.x = newCoordX;
    carMove(car, newCoordX, carInfo.coordinate.y);
    // car.style.transform = `translate(${newCoordX}px,${carInfo.coordinate.y}px)`;
    carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
  };
}
function carMoveToRight(car, carInfo) {
  return () => {
    const coordX = carInfo.coordinate.x;
    const newCoordX = coordX + 3;
    if (newCoordX > roadWidthHalf - carInfo.widthHalf) {
      return;
    }
    carInfo.coordinate.x = newCoordX;
    carMove(car, newCoordX, carInfo.coordinate.y);
    // car.style.transform = `translate(${newCoordX}px,${carInfo.coordinate.y}px)`;
    carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
  };
}

function carMove(car, x, y) {
  car.style.transform = `translate(${x}px,${y}px)`;
}
