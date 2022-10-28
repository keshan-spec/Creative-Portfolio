const wrapper = document.getElementById("wrapper");
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shapes = document.querySelectorAll(".shape");

const uniqueRand = (min, max, prev) => {
  let next = prev;

  while (prev === next) next = rand(min, max);

  return next;
}
window.onload = () => {
  // set a random config
  const index = uniqueRand(0, combinations.length - 1, prev),
    combination = combinations[index];

  wrapper.dataset.configuration = combination.configuration;
  wrapper.dataset.roundness = combination.roundness;

  // scale in the shapes
  document.querySelectorAll(".shape").forEach((shape, idx) => {
    shape.animate([
      { transform: "scale(0)" },
      { transform: "scale(1)" }
    ], {
      duration: 600,
      easing: "ease-in-out",
      fill: "forwards",
      delay: idx - 100
    });
  });
};

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 }
];

let prev = 0;

const datasetInterval = setInterval(() => {
  const index = uniqueRand(0, combinations.length - 1, prev),
    combination = combinations[index];

  wrapper.dataset.configuration = combination.configuration;
  wrapper.dataset.roundness = combination.roundness;

  prev = index;
}, 3000);


const about = document.getElementById("about")

about.addEventListener("click", () => {
  // set configuration and roundness to 1 and 2
  wrapper.dataset.configuration = 1;
  wrapper.dataset.roundness = 2;

  // clear the interval animation
  clearInterval(datasetInterval);

  // set the temp about data to display
  // each shape should disappear
  setTimeout(() => {
    document.getElementById("about_wrapper").style.display = "block";
  }, 1000);

  setTimeout(() => {
    about.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 1000,
      easing: "ease-in-out",
    }).onfinish = () => {
      about.style.display = "none";
    }

    shapes.forEach(shape => {
      shape.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
      ], {
        duration: 900,
        easing: "ease-in-out",
        delay: 1000,
        fill: "forwards"
      })
    }, 1000);

    setTimeout(() => {
      window.location = "about.html";
    }, 2000);
  });
});

// shape click event
shapes.forEach(shape => shape.addEventListener("click", () => shapeClick(shape)));

const shapeClick = shape => {
  // 
}