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

  const getRandomColor = () => {
    const color = chroma.random();
    return color;
  };

  const setColColor = (col, color) => {
    col.style.background = color;
  };

  const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? "black" : "white";
  };

  const setColsColors = (isInitial) => {
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, i) => {
      const isLocked = col.querySelector("i").classList.contains("fa-lock");
      if (isLocked) {
        color.push(text.textContent);
        return;
      }
      const text = col.querySelector("h2");
      const button = col.querySelector("button");
      console.log("COLOR", colors[i]);
      const color = isInitial && colors[i] ? colors[i] : getRandomColor();
      setColColor(col, color);
      if (!isInitial) colors.push(color);
      text.textContent = color;
      setTextColor(text, color);
      setTextColor(button, color);
    });

    updateColorHash(colors);
  };

  const updateColorHash = (colors = []) => {
    document.location.hash = colors
      .map((col) => {
        return col.toString().substring(1);
      })
      .join("-");
  };

  const getColorsFromHash = () => {
    if (document.location.hash.length > 1) {
      return document.location.hash
        .slice(1)
        .split("-")
        .map((c) => "#" + c);
    }
    return [];
  };
  console.log(getColorsFromHash());

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  setColsColors(true);

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
