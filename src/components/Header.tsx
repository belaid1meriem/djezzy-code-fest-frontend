import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {  MapIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
        
        <div className="flex items-center justify-center gap-4">
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Link to='map' ><Button variant={'ghost'}><MapIcon/></Button></Link></TooltipTrigger>
              <TooltipContent>
                <p>Check available events</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" onClick={toggleTheme} size="icon">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
