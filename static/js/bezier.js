class Curve {
    constructor(accuracy, points) {
        let tValues = range(0, 1, accuracy);
        //console.log(tValues);
        this.points = this.createCurve(tValues, points);
    }

    twoPoints(t, p1, p2) {
        p1 = p1.map(x => x * (1-t));
        p2 = p2.map(x => x * t);
        return [p1[0] + p2[0], p1[1] + p2[1]];    
    }

    createPoints(t, points) {
        let newPoints = new Array();
        for (let i = 0; i < points.length - 1; i++) {
            newPoints.push(this.twoPoints(t, points[i], points[i+1]));
        }
        return newPoints;
    }

    createPoint(t, points) {
        while (points.length > 1) {
            points = this.createPoints(t, points);
        }
        return points[0];
    }

    createCurve(tValues, points) {
        let curve = [];
        for (let i = 0; i < tValues.length; i++) {
            curve.push(this.createPoint(tValues[i], points))
        }
        return curve;
    }
}


