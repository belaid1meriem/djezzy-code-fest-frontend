import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(()=>{
    const dark = localStorage.getItem("dark");
    const enableDarkMode = dark ? dark=== "true" : false; 
    document.documentElement.classList.toggle("dark", enableDarkMode);
    return enableDarkMode;
  });

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
    localStorage.setItem("dark", JSON.stringify(!darkMode));
  };

  return (
    <header className="w-full border-b bg-background/60 sticky top-0 backdrop-blur-md z-10">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        
        <a href="/" className="text-5xl font-semibold font-logo">سبيل</a>
        
        <div className="flex items-center space-x-4">
          
          <Button variant="ghost" onClick={toggleTheme} size="icon">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
