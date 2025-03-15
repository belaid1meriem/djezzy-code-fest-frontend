import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreatePostFormProps {
  onCreatePost: (content: string, image: File | null) => void;
}

const CreatePostForm = ({ onCreatePost }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (content.trim() !== "") {
      onCreatePost(content, image);
      setContent("");
      setImage(null);
    }
  };

  return (
    <div className="bg-card p-4 rounded-md border border-border shadow-sm mb-6">
      <h3 className="text-lg font-medium mb-3">Share an Update</h3>
      <div className="flex flex-col space-y-3">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening at the event?"
          className="flex space-x-2"
        />
        <div className="border border-dashed border-border rounded-md p-4">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="file-upload" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
            {image ? `Selected: ${image.name}` : "Add an image (optional)"}
          </label>
        </div>
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">Post Update</Button>
      </div>
    </div>
  );
};

export default CreatePostForm;