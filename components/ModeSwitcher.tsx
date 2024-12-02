import { Moon, Sun } from "lucide-react";

interface ModeSwitcherProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const ModeSwitcher = ({ darkMode, setDarkMode }: ModeSwitcherProps) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`
        fixed bottom-4 right-6 p-2 bg-white dark:bg-solarized-base0 rounded-full shadow-lg
        hover:bg-solarized-base2 dark:hover:bg-solarized-base01
        text-black dark:text-white
        transition-colors duration-200
      `}
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ModeSwitcher;
