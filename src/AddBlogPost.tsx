import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import "./App.css";
import { Progress } from "@nextui-org/react";
interface BlogPost {
  Id: number;
  BlogTitle: string;
  BlogSubtitle: string;
  BlogContent: string;
  BlogReadingDuration: string;
}

function AddBlogPost() {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    Id: 0,
    BlogTitle: "",
    BlogSubtitle: "",
    BlogContent: "",
    BlogReadingDuration: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7179/BlogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      });

      if (response.status === 204) {
        setLoading(true);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      // Reset form after successful submission
      setBlogPost({
        Id: 0,
        BlogTitle: "",
        BlogSubtitle: "",
        BlogContent: "",
        BlogReadingDuration: "",
      });
    } catch (error) {
      console.error("Failed to submit blog post:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <label>
            Blog Title:
            <Input
              type="text"
              name="BlogTitle"
              value={blogPost.BlogTitle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Blog Subtitle:
            <Input
              type="text"
              name="BlogSubtitle"
              value={blogPost.BlogSubtitle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Blog Content:
            <Input
              type="text"
              name="BlogContent"
              value={blogPost.BlogContent}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Blog Reading Duration:
            <Input
              type="text"
              name="BlogReadingDuration"
              value={blogPost.BlogReadingDuration}
              onChange={handleInputChange}
            />
          </label>
          <Input type="submit" value="Submit" />
        </div>
      </form>
      {loading && (
        <div className="w-full">
          <Progress size="sm" isIndeterminate aria-label="Loading..." />
        </div>
      )}
    </>
  );
}

export default AddBlogPost;
