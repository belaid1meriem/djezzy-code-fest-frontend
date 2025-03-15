// src/components/Posts/index.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EventSelector from "./EventSelector";
import EventDetails from "./EventDetails";
import PostsList from "./PostsList";
import CreatePostForm from "./CreatePostForm";
import { Post, Event, Like, Comment } from "./types";

const Posts = () => {
  // States for posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState("posts");
  
  // Mock current user (will come from auth context soon)
  const currentUser = {
    id: "current-user-id",
    username: "You"
  };

  useEffect(() => {
    // Mock data initialization
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
    
    // Simulate fetching posts with likes and comments
    const mockPosts: Post[] = [
      {
        id: 101,
        user: "Roufaida",
        content: "the iftar of today was so good , jazakoum allah khayran",
        image: undefined,
        eventId: 1,
        createdAt: new Date(2025, 3, 20, 9, 30),
        likes: [
          { id: 1, post_id: 101, user_id: "user-123", username: "Rofa" },
          { id: 2, post_id: 101, user_id: "user-456", username: "Mimi" }
        ],
        comments: [
          { 
            id: 1, 
            post_id: 101, 
            user_id: "user-123", 
            username: "Maamar", 
            content: "Alhamdulillah, it was amazing!", 
            createdAt: new Date(2025, 3, 20, 10, 15) 
          }
        ]
      },
      {
        id: 102,
        user: "Meriem",
        content: "I really liked the community of this iftar !",
        image: undefined,
        eventId: 1,
        createdAt: new Date(2025, 3, 20, 10, 15),
        likes: [
          { id: 3, post_id: 102, user_id: "user-789", username: "Karim" }
        ],
        comments: []
      },
    ];
    
    setPosts(mockPosts);
  }, []);

  // Create a new post for the current event
  const handleCreatePost = (content: string, image: File | null) => {
    if (content.trim() !== "" && currentEventId !== null) {
      const newPost: Post = {
        id: Date.now(),
        user: currentUser.username,
        content: content,
        image: image ? URL.createObjectURL(image) : undefined,
        eventId: currentEventId,
        createdAt: new Date(),
        likes: [],
        comments: []
      };
      setPosts([newPost, ...posts]);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleUpdatePost = (id: number, content: string) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, content } : post
    ));
  };

  // Like/Unlike a post
  const handleToggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        // Check if user already liked the post
        const existingLike = post.likes.find(like => like.user_id === currentUser.id);
        
        if (existingLike) {
          // Unlike: remove the like
          return {
            ...post,
            likes: post.likes.filter(like => like.user_id !== currentUser.id)
          };
        } else {
          // Like: add a new like
          const newLike: Like = {
            id: Date.now(),
            post_id: postId,
            user_id: currentUser.id,
            username: currentUser.username
          };
          
          return {
            ...post,
            likes: [...post.likes, newLike]
          };
        }
      }
      return post;
    }));
  };

  // Add a comment to a post
  const handleAddComment = (postId: number, content: string) => {
    if (content.trim() === "") return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          post_id: postId,
          user_id: currentUser.id,
          username: currentUser.username,
          content: content,
          createdAt: new Date()
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  // Delete a comment
  const handleDeleteComment = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  const currentEvent = events.find(event => event.id === currentEventId);
  const eventPosts = posts.filter(post => post.eventId === currentEventId);

  return (
    <Card className="w-full shadow-md border border-border">
      <CardContent className="p-6">
        {/* Event Selection */}
        <div className="mb-6">
          <EventSelector 
            events={events}
            currentEventId={currentEventId}
            onSelectEvent={(id) => setCurrentEventId(id)}
          />

          {currentEvent && (
            <>
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
                <EventDetails event={currentEvent} />
              ) : (
                <>
                  <CreatePostForm onCreatePost={handleCreatePost} />
                  <PostsList 
                    posts={eventPosts} 
                    currentUserId={currentUser.id}
                    onDeletePost={handleDeletePost}
                    onUpdatePost={handleUpdatePost}
                    onToggleLike={handleToggleLike}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                  />
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;