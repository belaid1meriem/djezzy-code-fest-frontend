// src/components/Leaderboard/index.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, ChevronUp, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardUser {
  id: string;
  username: string;
  points: number;
  avatar?: string;
  rank?: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockUsers: LeaderboardUser[] = [
        { id: "user1", username: "Ahmed", points: 850 },
        { id: "user2", username: "Fatima", points: 720 },
        { id: "user3", username: "Karim", points: 1200 },
        { id: "user4", username: "Leila", points: 980 },
        { id: "user5", username: "Omar", points: 1050 },
        { id: "user6", username: "Sana", points: 890 },
        { id: "user7", username: "Mohammed", points: 1150 },
        { id: "user8", username: "Amina", points: 760 },
        { id: "user9", username: "Yousef", points: 930 },
        { id: "user10", username: "Nora", points: 680 },
        { id: "user11", username: "Hamza", points: 820 },
        { id: "user12", username: "Zainab", points: 770 },
      ];

      // Sort and assign ranks
      const sortedUsers = sortUsersByPoints(mockUsers, "desc");
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
      setIsLoading(false);
    }, 1000);
  };

  const sortUsersByPoints = (usersList: LeaderboardUser[], order: "asc" | "desc"): LeaderboardUser[] => {
    const sorted = [...usersList].sort((a, b) => {
      return order === "desc" ? b.points - a.points : a.points - b.points;
    });
    
    // Assign ranks
    return sorted.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    setFilteredUsers(sortUsersByPoints(filteredUsers, newOrder));
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="text-sm font-medium w-5 text-center">{rank}</span>;
  };

  return (
    <Card className="w-full shadow-md border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Volunteer Leaderboard</span>
          {!isLoading && (
            <span className="text-sm text-muted-foreground">
              {filteredUsers.length} volunteers
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search and Sort */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search volunteers..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9 w-full"
              />
            </div>
            <Button 
              onClick={toggleSortOrder} 
              variant="outline"
              className="flex items-center space-x-1"
            >
              {sortOrder === "desc" ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : (
            <>
              {/* Top 3 users highlight */}
              <div className="flex justify-between items-end mb-6">
                {filteredUsers.slice(0, 3).map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col items-center ${
                      index === 1 ? "flex-1 order-1" : index === 0 ? "flex-1 order-2" : "flex-1 order-3"
                    }`}
                  >
                    <div className={`
                      w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 
                      flex items-center justify-center text-2xl font-bold
                      border-4 ${
                        index === 0 ? "border-yellow-500 text-yellow-500" :
                        index === 1 ? "border-gray-400 text-gray-400" :
                        "border-amber-700 text-amber-700"
                      }
                    `}>
                      {user.username.charAt(0)}
                    </div>
                    <div className={`
                      rounded-full text-xs px-3 py-1 font-bold mt-2
                      ${
                        index === 0 ? "bg-yellow-100 text-yellow-800" :
                        index === 1 ? "bg-gray-100 text-gray-800" :
                        "bg-amber-100 text-amber-800"
                      }
                    `}>
                      {user.points} pts
                    </div>
                    <div className="mt-1 text-center">
                      <p className="font-medium text-sm truncate max-w-20">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        Rank #{index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Leaderboard list */}
              <div className="border rounded-md divide-y">
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex items-center p-3 hover:bg-secondary/20 ${
                        index < 3 ? "bg-secondary/10" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="flex-shrink-0">
                          {getRankIcon(user.rank || index + 1)}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm mr-2">
                          {user.username.charAt(0)}
                        </div>
                        <span className="font-medium">{user.username}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{user.points}</span>
                        <span className="text-muted-foreground text-sm ml-1">pts</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredUsers.length === 0 && !isLoading && (
                  <div className="p-8 text-center text-muted-foreground">
                    No volunteers found matching your search.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;