import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, X, Menu } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ 
  setActiveTab, 
  activeTab,
  isSidebarOpen, 
  toggleSidebar 
}: SidebarProps) => {
  return (
    <>
      {/* Fixed position menu button when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="p-4 md:p-1">
          <Button
            onClick={toggleSidebar}
            className="p-2"
          >
            <Menu />
          </Button>
        </div>
      )}
     
      {/* Sidebar with animation */}
      <motion.div 
        initial={{ x: -500 }}
        animate={{ x: isSidebarOpen ? 0 : -500 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-30 h-full w-90 bg-background shadow-xl border-r border-border"
      >
        <div className="flex flex-col h-full">
         
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-2xl font-semibold">
              <span className="text-4xl font-semibold font-logo text-primary">سبيل</span> 
              <span className="ml-2">Community</span>
            </h2>
            <div className="ml-6">
              <Button onClick={toggleSidebar} size="icon" className="p-2">
                <X />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col p-4 space-y-2">
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-md transition-all ${
                activeTab === "chat" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-input'
              }`}
              onClick={() => setActiveTab("chat")}
            >
              <MessageSquare className="h-5 w-5" /> 
              <span>Chat</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-md transition-all ${
                activeTab === "posts" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-input'
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <Users className="h-5 w-5" /> 
              <span>Posts</span>
            </button>
          </div>
          
          {/* Footer info */}
          <div className="mt-auto p-4 border-t border-border text-sm text-muted-foreground">
            <p>© 2025 سبيل Community</p>
          </div>
        </div>
      </motion.div>
      
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;