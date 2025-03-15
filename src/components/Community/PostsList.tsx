// src/components/Posts/PostsList.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post, Comment, formatDate } from "./types";

interface PostsListProps {
  posts: Post[];
  currentUserId: string;
  onDeletePost: (id: number) => void;
  onUpdatePost: (id: number, content: string) => void;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, content: string) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
}

const PostsList = ({ 
  posts, 
  currentUserId, 
  onDeletePost, 
  onUpdatePost, 
  onToggleLike, 
  onAddComment, 
  onDeleteComment 
}: PostsListProps) => {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editPostContent, setEditPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});
  const [expandedComments, setExpandedComments] = useState<{[key: number]: boolean}>({});

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditPostContent(post.content);
  };

  const handleUpdatePost = () => {
    if (editingPostId !== null) {
      onUpdatePost(editingPostId, editPostContent);
      setEditingPostId(null);
      setEditPostContent("");
    }
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value
    });
  };

  const handleSubmitComment = (postId: number) => {
    const content = commentInputs[postId]?.trim();
    if (content) {
      onAddComment(postId, content);
      setCommentInputs({
        ...commentInputs,
        [postId]: ""
      });
    }
  };

  const toggleComments = (postId: number) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId]
    });
  };

  const isLikedByCurrentUser = (post: Post) => {
    return post.likes.some(like => like.user_id === currentUserId);
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Users className="h-12 w-12 mb-2 opacity-50" />
        <p>No posts yet for this event. Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
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
              
              {/* Like and Comment counts */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-3 mb-2">
                <div className="flex items-center">
                  <span>{post.likes.length} likes</span>
                </div>
                <div className="flex items-center">
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex border-t border-b border-border py-2 mb-3 " >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex-1 hover:bg-input hover:text-primary ${isLikedByCurrentUser(post) ? 'text-primary' : ''}`}
                  onClick={() => onToggleLike(post.id)}
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${isLikedByCurrentUser(post) ? 'fill-primary' : ''}`} 
                  />
                  Like
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1 hover:bg-input hover:text-primary"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
              
              {/* Comments section */}
              {(expandedComments[post.id] || post.comments.length > 0) && (
                <div className="mt-3">
                  {/* Comment input */}
                  <div className="flex space-x-2 mb-3">
                    <Input
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmitComment(post.id);
                      }}
                    />
                    <Button 
                      size="icon" 
                      onClick={() => handleSubmitComment(post.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Existing comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 max-h-60 overflow-y-auto border-t border-border pt-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2">
                          <div className="h-6 w-6 rounded-full bg-secondary/40 flex items-center justify-center text-xs flex-shrink-0">
                            {comment.username.charAt(0)}
                          </div>
                          <div className="flex-1 bg-secondary/10 p-2 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{comment.username}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                          {comment.user_id === currentUserId && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground   hover:bg-input hover:text-primary"
                              onClick={() => onDeleteComment(post.id, comment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {post.user === "You" && (
                <div className="flex space-x-2 justify-end mt-4">
                  <Button onClick={() => handleEditPost(post)} variant="outline" size="sm" className="hover:bg-primary/70">Edit</Button>
                  <Button onClick={() => onDeletePost(post.id)} variant="destructive" size="sm">Delete</Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PostsList;