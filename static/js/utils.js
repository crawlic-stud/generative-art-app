function offsetToCenter(points) {
    let xArray = points.map(x => x[0]);
    let yArray = points.map(x => x[1]);

    let xMin = Math.min(...xArray);
    let xMax = Math.max(...xArray);
    let yMin = Math.min(...yArray);
    let yMax = Math.max(...yArray);

    let offsetX = (window.innerWidth - xMax - xMin) / 2;
    let offsetY = (yMin - window.innerHeight + yMax) /2;

    points = points.map(x => [x[0] + offsetX, x[1] - offsetY]);
    return points;
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

function randint(start, end){
    return Math.round(Math.random() * (end - start)) + start;
}

function choice(array) {
    return array[Math.round(Math.random() * (array.length - 1))];
}

const log = (x, y) => Math.log(y) / Math.log(x);

function range(start, stop, step) {
    if (step >= 1) {
        return [...Array(5).keys()];
    }

    let rangeArray = new Array();
    for (let i = start; i < stop; i += step) {
        rangeArray.push(parseFloat(i.toFixed(log(10, 1/step) + 1)));
    }
    return rangeArray;
}
