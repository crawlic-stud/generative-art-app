

const delay = async t => new Promise(r => setTimeout(r, t));

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
resizeCanvas();

function clearCanvas() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let maxId = window.setTimeout(function() {}, 0);
    while (maxId--) {
        window.clearTimeout(maxId);
    }
}

async function drawImage() {

    function drawLine(start, end, color='#3370d4', width=1) {
        if (width <= 0) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();      
        ctx.moveTo(start[0], start[1]);   
        ctx.lineTo(end[0], end[1]); 
        ctx.closePath();
        ctx.stroke();
    }

    const maxSize = Math.min(window.innerHeight, window.innerWidth);
    const randomPoint = () => [Math.random() * maxSize, Math.random() * maxSize];

    const mainWidth = parseFloat(document.querySelector("#mainWidthValue").value);
    const secondaryWidth = parseFloat(document.querySelector("#secondaryWidthValue").value);

    const cycles = parseFloat(document.querySelector("#cyclesValue").value);
    const angles = parseFloat(document.querySelector("#anglesValue").value);
    const accuracy = parseFloat(document.querySelector("#accuracyValue").value);
    const lines = parseFloat(document.querySelector("#linesValue").value);

    const millisecDelay = 1;

    const animation = document.querySelector("#animationCheckbox").checked;
    const speed = parseFloat(document.querySelector("#speedValue").value);

    const centered = document.querySelector("#centeredCheckbox").checked;
    const changeColor = document.querySelector("#changeColorCheckbox").checked;

    let colorFunc = () => randomGreen();
    let color = colorFunc();

    clearCanvas();
    for (let i = 0; i < cycles; i++) {
        let points = [];
        for (let j = 0; j < angles; j++) {
            points.push(randomPoint());
        }
        
        if (changeColor) color = colorFunc();

        let curve = new Curve(accuracy, points);
        if (centered) {
            curve.points = offsetToCenter(curve.points);
        }
        for (let i = 0; i < curve.points.length - 1; i++) {
            drawLine(curve.points[i], curve.points[i+1], color, mainWidth);
            if (animation && i % speed == 0) await delay(millisecDelay);
        }
        
        let secondaryPoints = new Array();
        for (let _k = 0; _k < lines; _k++) {
            secondaryPoints[_k] = choice(curve.points);
        }

        for (let k = 0; k < secondaryPoints.length - 1; k++) {
            drawLine(secondaryPoints[k], secondaryPoints[k+1], color, secondaryWidth);
            if (animation && k % speed == 0) await delay(millisecDelay);
        }
    }
}

function drawPolygon(points, color='#3370d4') {
    ctx.fillStyle = color;
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.beginPath();
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
}

function drawCircle(x, y, radius, color='#3370d4'){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
}

async function drawBezierCircle(accuracy, points, color='#3370d4', radius=10, centered = true) {
    let curve = new Curve(accuracy, points);
    for (let i = 0; i < curve.points.length; i++) {
        drawCircle(curve.points[i][0], curve.points[i][1], radius, color);
        await delay(millisecDelay);
    }
    return curve.points;
}

async function drawBezierPolygon(accuracy, points, color='#3370d4', centered = true) {
    let curve = new Curve(accuracy, points);
    for (let i = 0; i < curve.points.length - 1; i++) {
        drawPolygon(curve.points, color);
        await delay(millisecDelay);
    }
    return curve.points;
}