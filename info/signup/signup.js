const { animate } = anime;


animate(".line-background svg", {
    translateX: [-200, 0],
    duration: 10000,
    ease: "linear",
    loop: true
});