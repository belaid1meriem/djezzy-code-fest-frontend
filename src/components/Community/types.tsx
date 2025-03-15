export interface Post {
  id: number;
  user: string;
  content: string;
  image?: string;
  eventId: number;
  createdAt: Date;
  likes: Like[];
  comments: Comment[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  charity_id: string;
  latitude: number;
  longitude: number;
}

export interface Like {
  id: number;
  post_id: number;
  user_id: string;
  username?: string; // Optional for display purposes
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: string;
  username: string;
  content: string;
  createdAt: Date;
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};