import { useEffect, useState } from "react";
import "./App.css";
import AddBlogPost from "./AddBlogPost.tsx";
import { Button } from "@nextui-org/react";
import config from "../../variables/config.ts";

interface BlogPost {
  id: number;
  Id: number;
  BlogTitle: string;
  BlogSubtitle: string;
  BlogContent: string;
  BlogReadingDuration: string;
}

function App() {
  const [blogPost, setBlogPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`${config}/BlogPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setBlogPosts(data);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 204) {
        setStatus("success");
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    }
  }

  async function deletePost(itemId: number) {
    try {
      const response = await fetch(`${config}/BlogPosts/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData();
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-zinc-50		 font-bold underline">
        Hello world!
      </h1>
      <AddBlogPost />
      {blogPost?.map((item: BlogPost, index) => (
        <div key={index}>
          <Button color="primary" onClick={() => deletePost(item.id)}>
            Sil
          </Button>
          <h3>Title : {item.BlogTitle}</h3>
          <p>Subtitle : {item.BlogSubtitle}</p>
          <p>Content : {item.BlogContent}</p>
          <p>Duration : {item.BlogReadingDuration}</p>
          <hr />
        </div>
      ))}
      {status === "success" && <p>Deleted</p>}
    </div>
  );
}

export default App;
