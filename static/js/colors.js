function randomRGB() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return formatRGB(r, g, b);
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = Math.random();
    return formatRGBA(r, g, b, a);
}    

function formatRGB(r, g, b) {
    return 'rgba('+r+', '+g+', '+b+', '+1+')';
}

function formatRGBA(r, g, b, a) {
    return 'rgba('+r+', '+g+', '+b+', '+a+')';
}

function hsv2rgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}

function randomPastel(){
    let h = randint(0, 360) / 360;
    let s = randint(30, 60) / 100;
    return formatRGB(...hsv2rgb(h, s, 1));
}

function randomRed() {
    let h = randint(0, 20) / 360;
    let s = randint(50, 100) / 100;
    let v = randint(50, 100) / 100;
    return formatRGB(...hsv2rgb(h, s, v));
}

function randomBlue() {
    let h = randint(170, 240) / 360;
    let s = randint(50, 100) / 100;
    let v = randint(50, 100) / 100; 
    return formatRGB(...hsv2rgb(h, s, v));
}

function randomGreen() {
    let h = randint(61, 140) / 360;
    let s = randint(50, 100) / 100;
    let v = randint(50, 100) / 100; 
    return formatRGB(...hsv2rgb(h, s, v));
}

function hueRange(start, end) {
    let h = randint(start, end) / 360;
    let s = randint(50, 100) / 100;
    let v = randint(50, 100) / 100; 
    return formatRGB(...hsv2rgb(h, s, v));
}