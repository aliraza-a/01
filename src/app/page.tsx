"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome to Next.js Counter App!</h1>
      <p className="mt-4 text-lg">Counter: {counter}</p>
      <div className="flex items-center justify-center gap-3 mt-3">
        <Button variant="default" onClick={() => setCounter(counter + 1)}>
          +
        </Button>
        <Button
          variant="destructive"
          onClick={counter > 0 ? () => setCounter(counter - 1) : undefined}
        >
          -
        </Button>
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <Button
          variant="default"
          onClick={async () => {
            setLoading(true);
            try {
              const data = await getPosts();
              setPosts(data);
            } catch (error) {
              console.error("Failed to fetch posts:", error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Loading..." : "Get Posts"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setPosts([]);
          }}
        >
          Clear Posts
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
        {posts.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-3">
            <h2 className="text-xl font-bold">Posts:</h2>
            <ul className="mt-2">
              {posts.map((post: Post) => (
                <li key={post.id} className="p-2 border-b">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
