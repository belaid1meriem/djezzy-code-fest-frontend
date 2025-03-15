import { useState } from "react";

// Import components
import Sidebar from './SideBar';
import Chat from './Chat';
import Posts from './Posts';
import LeaderBoard from './LeaderBoard'; // Import the LeaderBoard component

export default function Community() {
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Header */}
      <header className="p-4 border-b border-border bg-background shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-3xl font-semibold">
              <span className="text-5xl font-semibold font-logo text-primary">سبيل</span> 
              <span className="ml-2">Community</span>
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 container mx-auto mt-6">
        {/* Sidebar */}
        <Sidebar 
          setActiveTab={setActiveTab} 
          activeTab={activeTab} 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Main Content */}
        <div className={`flex-1 p-4 md:p-1 transition-all ${isSidebarOpen ? 'blur-sm' : ''}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {activeTab === "chat" 
                ? "Community Chat" 
                : activeTab === "posts" 
                ? "Community Posts" 
                : "Leaderboard"}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === "chat" 
                ? "Join the conversation with fellow community members" 
                : activeTab === "posts" 
                ? "Share your thoughts and ideas with the community"
                : "See the top contributors in the community"}
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto">
            {activeTab === "chat" ? (
              <Chat />
            ) : activeTab === "posts" ? (
              <Posts />
            ) : (
              <LeaderBoard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}