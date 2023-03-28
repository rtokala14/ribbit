"use client";

import { useEffect } from "react";

function ThemeToggle() {
  useEffect(() => {
    [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) => {
      el.addEventListener("click", toggleTheme);
    });

    return () =>
      [...document.querySelectorAll("[data-toggle-theme]")].forEach((el) =>
        el.removeEventListener("click", toggleTheme)
      );
  }, []);
  return (
    <button
      //   className="toggle"
      data-key={"ribbit-theme"}
      data-toggle-theme="fantasy,halloween"
    >
      Toggle Dark Mode
    </button>
  );
}

export default ThemeToggle;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toggleTheme(evt: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const themesList = evt.target.getAttribute("data-toggle-theme");
  if (themesList) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const themesArray = themesList.split(",");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (document.documentElement.getAttribute("data-theme") == themesArray[0]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (themesArray.length == 1) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("ribbit-theme");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        document.documentElement.setAttribute("data-theme", themesArray[1]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        localStorage.setItem("ribbit-theme", themesArray[1]);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      document.documentElement.setAttribute("data-theme", themesArray[0]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      localStorage.setItem("ribbit-theme", themesArray[0]);
    }
  }
}
