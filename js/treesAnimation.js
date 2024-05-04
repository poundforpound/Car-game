const trees = document.querySelectorAll('.tree');
const treesCoordinate = [];

function treesAnimation(speed) {
  trees.forEach((el) => {
    const coordinate = getCoord(el);
    treesCoordinate.push(coordinate);
    let newCoordY = coordinate.y + speed;

    if (newCoordY > window.innerHeight) {
      newCoordY = -320;
    }
    coordinate.y = newCoordY;
    el.style.transform = `translate(${coordinate.x}px,${newCoordY}px)`;
  });
}
