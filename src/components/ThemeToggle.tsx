"use client";

import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("fantasy");

  useEffect(() => {
    // document.querySelector("html")?.setAttribute("data-theme", theme);
    themeCheck();
  }, [theme]);

  useEffect(() => {
    themeCheck();
  }, []);

  const themeCheck = () => {
    if (
      localStorage.getItem("ribbit-theme") === "halloween" ||
      (!("ribbit-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.querySelector("html")?.setAttribute("data-theme", "halloween");
      setTheme("halloween");
    } else {
      document.querySelector("html")?.setAttribute("data-theme", "fantasy");
      setTheme("fantasy");
    }
  };

  const toggleTheme = () => {
    const localTheme = localStorage.getItem("ribbit-theme");
    if (localTheme) {
      localStorage.setItem(
        "ribbit-theme",
        localTheme === "halloween" ? "fantasy" : "halloween"
      );
    } else {
      localStorage.setItem("ribbit-theme", "halloween");
    }
    setTheme((theme) => (theme === "fantasy" ? "halloween" : "fantasy"));
  };

  return (
    <label className="label flex cursor-pointer items-center justify-between">
      <span className="label-text">Dark Theme</span>
      <input
        type="checkbox"
        className="toggle"
        onChange={toggleTheme}
        checked={theme === "halloween"}
      />
    </label>
  );
}

export default ThemeToggle;
