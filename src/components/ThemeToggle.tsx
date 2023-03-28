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
    <button
      //   className="toggle"
      // data-key={"ribbit-theme"}
      // data-toggle-theme="fantasy,halloween"
      onClick={toggleTheme}
    >
      Toggle Dark Mode
    </button>
  );
}

export default ThemeToggle;
