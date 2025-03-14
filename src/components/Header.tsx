import { Button } from "../components/ui/button";
import { Moon, Sun, MapIcon } from "lucide-react";
import { Link } from "react-router"; 
import { useTheme } from "../contexts/ThemeContext"; 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // Use ThemeContext

  return (
    <header className="w-full border-b bg-background/60 sticky top-0 backdrop-blur-md z-10">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        
        <a href="/" className="text-5xl font-semibold font-logo">سبيل</a>
        
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/map">
                  <MapIcon className="size-4.5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Check available events</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" onClick={toggleTheme} size="icon" aria-label="Toggle Theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
