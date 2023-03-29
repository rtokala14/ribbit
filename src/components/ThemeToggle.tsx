"use client";

import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("fantasy");
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
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
