import { useEffect } from "react";
import { themeChange } from "theme-change";

function ThemeToggle() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div>
      <button
        data-key="ribbit-theme"
        data-set-theme="halloween"
        className="btn"
      >
        Halloween
      </button>
      <button data-key="ribbit-theme" data-set-theme="fantasy" className="btn">
        Fantasy
      </button>
    </div>
  );
}

export default ThemeToggle;
