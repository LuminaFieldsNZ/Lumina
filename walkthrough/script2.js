

const blob = document.getElementById("blob");

window.onpointermove = event => {
  const { clientX, clientY } = event;

  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

/* -- Text effect -- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const screen = document.querySelector(".screen"),
      namez = document.querySelector(".namez");

screen.onmouseenter = event => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    namez.innerText = namez.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return namez.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");

    if(iteration >= namez.dataset.value.length){
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}
