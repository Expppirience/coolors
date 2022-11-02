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
      const isLocked = col.querySelector("i").classList.contains("fa-lock");
      if (isLocked) return;
      const text = col.querySelector("h2");
      const button = col.querySelector("button");
      const color = setRandomColors(col);
      text.textContent = color;
      setTextColor(text, color);
      setTextColor(button, color);
    });
  };

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  setColsColors();

  window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
      e.preventDefault();
      setColsColors();
    }
  });

  window.addEventListener("click", (e) => {
    const button = e.target.closest('[data-type="lock"]');
    const title = e.target.closest('[data-type="copy"]');
    if (button) {
      const icon = button.querySelector("i");
      icon.classList.toggle("fa-lock-open");
      icon.classList.toggle("fa-lock");
    } else if (title) {
      copyToClipboard(title.textContent);
    }
  });
});
