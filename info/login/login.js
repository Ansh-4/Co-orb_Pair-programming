const paths = document.querySelectorAll(".animated-background path");

paths.forEach(path => {
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
});

paths.forEach((path, index) => {

    const length = path.getTotalLength();

    anime.animate(path, {
        strokeDashoffset: [length, 0],
        duration: 3000,
        delay: index * 500,
        ease: "inOutQuad",
        loop: true,
        alternate: true
    });

});
const { animate, stagger } = anime;


/* =========================
   CREATE TICK MARKS
========================= */

const ticks = document.getElementById("ticks");

for (let i = 0; i < 120; i++) {

    const angle = i * 3;

    const radians = angle * Math.PI / 180;

    const outerRadius = 270;
    const innerRadius = i % 5 === 0 ? 255 : 262;

    const x1 = 350 + Math.cos(radians) * innerRadius;
    const y1 = 350 + Math.sin(radians) * innerRadius;

    const x2 = 350 + Math.cos(radians) * outerRadius;
    const y2 = 350 + Math.sin(radians) * outerRadius;

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);

    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    ticks.appendChild(line);
}


/* =========================
   ROTATE OUTER HUD
========================= */

animate(".arc-1", {
    rotate: 360,

    duration: 14000,

    ease: "linear",

    loop: true
});


animate(".arc-2", {
    rotate: -360,

    duration: 20000,

    ease: "linear",

    loop: true
});


animate(".arc-3", {
    rotate: 360,

    duration: 26000,

    ease: "linear",

    loop: true
});


/* =========================
   ROTATE TICKS
========================= */

animate(".ticks", {

    rotate: 360,

    duration: 30000,

    ease: "linear",

    loop: true
});


/* =========================
   ORB FLOATING
========================= */

animate(".orb-lines", {

    rotateY: [0, 15, -15, 0],

    scale: [1, 1.03, 1],

    duration: 5000,

    ease: "inOutSine",

    loop: true
});


/* =========================
   ORB PULSE
========================= */

animate(".orb-core", {

    scale: [0.9, 1.15],

    opacity: [0.05, 0.15],

    duration: 2500,

    ease: "inOutSine",

    alternate: true,

    loop: true
});