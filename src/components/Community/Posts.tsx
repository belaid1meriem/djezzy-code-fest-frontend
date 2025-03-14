import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MapPin, Building, Info } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  id: number;
  user: string;
  content: string;
  image?: string;
  eventId: number;
  createdAt: Date;
}

interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  charity_id: string;
  latitude: number;
  longitude: number;
}

const Posts = () => {
  // States for posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editPostContent, setEditPostContent] = useState("");
  
  
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState("posts");

  
  useEffect(() => {
    
    const mockEvents: Event[] = [
      {
        id: 1,
        name: "Iftar in Tipasa",
        description: "Join us for a collaborative iftar and help us to draw smiles in people faces!",
        date: new Date(2025, 3, 20),
        charity_id: "1",
        latitude: 25.1972,
        longitude: 55.2744
      },
      {
        id: 2,
        name: "Iftar in Alger, El harrach",
        description: "Help us to feed too many people and gain hasanat!",
        date: new Date(2025, 3, 25),
        charity_id: "2",
        latitude: 25.2048,
        longitude: 55.2708
      }
    ];
    
    setEvents(mockEvents);
    if (mockEvents.length > 0) {
      setCurrentEventId(mockEvents[0].id);
    }
    
    // Simulate fetching posts
    const mockPosts: Post[] = [
      {
        id: 101,
        user: "Roufaida",
        content: "the iftar of today was so good , jazakoum allah khayran",
        image: undefined,
        eventId: 1,
        createdAt: new Date(2025, 3, 20, 9, 30)
      },
      {
        id: 102,
        user: "Meriem ",
        content: "I really liked the community of this iftar !",
        image: undefined,
        eventId: 1,
        createdAt: new Date(2025, 3, 20, 10, 15)
      },
      
    ];
    
    setPosts(mockPosts);
  }, []);

  // Create a new post for the current event
  const handleCreatePost = () => {
    if (newPostContent.trim() !== "" && currentEventId !== null) {
      const newPost: Post = {
        id: Date.now(),
        user: "You",
        content: newPostContent,
        image: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
        eventId: currentEventId,
        createdAt: new Date()
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setNewPostImage(null);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEditPost = (id: number) => {
    const post = posts.find(post => post.id === id);
    if (post) {
      setEditingPostId(id);
      setEditPostContent(post.content);
    }
  };

  const handleUpdatePost = () => {
    if (editingPostId !== null) {
      setPosts(posts.map(post =>
        post.id === editingPostId ? { ...post, content: editPostContent } : post
      ));
      setEditingPostId(null);
      setEditPostContent("");
    }
  };

  


  const currentEvent = events.find(event => event.id === currentEventId);
 


  const eventPosts = posts.filter(post => post.eventId === currentEventId);



  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full shadow-md border border-border ">
      <CardContent className="p-6">
        {/* Event Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Current Event</h3>
            <select 
              className="p-2 border border-border rounded-md bg-input"
              value={currentEventId?.toString() || ""} 
              onChange={(e) => setCurrentEventId(Number(e.target.value))}
            >
              {events.map(event => (
                <option key={event.id} value={event.id.toString()}>{event.name}</option>
              ))}
            </select>
          </div>

          {currentEvent && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/20 p-4 rounded-md mb-6"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-semibold">{currentEvent.name}</h4>
                <span className="px-2 py-1 text-xs bg-primary/10 rounded-full">
                  ID: {currentEvent.charity_id}
                </span>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <button 
                  className={`px-4 py-2 rounded-md ${activeView === 'posts' ? 'bg-primary text-primary-foreground' : 'bg-secondary/40'}`}
                  onClick={() => setActiveView('posts')}
                >
                  Posts
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${activeView === 'eventDetails' ? 'bg-primary text-primary-foreground' : 'bg-secondary/40'}`}
                  onClick={() => setActiveView('eventDetails')}
                >
                  Event Details
                </button>
              </div>
              
              {activeView === 'eventDetails' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(currentEvent.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Location: {currentEvent.latitude.toFixed(4)}, {currentEvent.longitude.toFixed(4)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>Charity ID: {currentEvent.charity_id}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-muted-foreground mt-2">
                    <Info className="h-4 w-4 mt-1" />
                    <p>{currentEvent.description}</p>
                  </div>
                </div>
              ) : (
                <>
               



                  <div className="bg-card p-4 rounded-md border border-border shadow-sm mb-6">
                    <h3 className="text-lg font-medium mb-3">Share an Update</h3>
                    <div className="flex flex-col space-y-3">
                      <Input
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="What's happening at the event?"
                        className="flex space-x-2"
                      />
                      <div className="border border-dashed border-border rounded-md p-4">
                        <Input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                          {newPostImage ? `Selected: ${newPostImage.name}` : "Add an image (optional)"}
                        </label>
                      </div>
                      <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90">Post Update</Button>
                    </div>
                  </div>
                  
              




                  {eventPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Users className="h-12 w-12 mb-2 opacity-50" />
                      <p>No posts yet for this event. Be the first to share something!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {eventPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-md border border-border bg-card shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
                                {post.user.charAt(0)}
                              </div>
                              <span className="font-medium">{post.user}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
                          </div>
                          
                          {editingPostId === post.id ? (
                            <div className="space-y-2">
                              <Input
                                value={editPostContent}
                                onChange={(e) => setEditPostContent(e.target.value)}
                                className="flex space-x-2"
                              />
                              <div className="flex space-x-2">
                                <Button onClick={handleUpdatePost} className="bg-primary hover:bg-primary/90">Save</Button>
                                <Button onClick={() => setEditingPostId(null)} variant="outline" className="hover:bg-primary/70">Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="mb-3">{post.content}</p>
                              {post.image && (
                                <div className="rounded-md overflow-hidden mb-3">
                                  <img src={post.image} alt="Post" className="w-full object-cover max-h-64" />
                                </div>
                              )}
                              {post.user === "You" && (
                                <div className="flex space-x-2 justify-end mt-2">
                                  <Button onClick={() => handleEditPost(post.id)} variant="outline" size="sm" className="hover:bg-primary/70">Edit</Button>
                                  <Button onClick={() => handleDeletePost(post.id)} variant="destructive" size="sm">Delete</Button>
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;