window.addEventListener("load", (e) => {
  const cols = document.querySelectorAll(".col");

  const generateRandomColor = () => {
    const hexCodes = "0123456789ABCDEF";
    let color = "";

    for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return "#" + color;
  };

  const setRandomColors = (node) => {
    const color = chroma.random();
    node.style.background = color;
    return color;
  };

  const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? "black" : "white";
  };

  const setColsColors = () => {
    cols.forEach((col) => {
      const text = col.querySelector("h2");
      const button = col.querySelector("button");
      const color = setRandomColors(col);
      text.textContent = color;
      setTextColor(text, color);
      setTextColor(button, color);
    });
  };
  setColsColors();

  window.addEventListener("keydown", (e) => {
    e.code == "Space" ? setColsColors() : "";
  });
});