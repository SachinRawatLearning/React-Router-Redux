import { useQuery } from "@tanstack/react-query"; // react-query
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return data;
};

export function Posts() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Loading posts...</h2>
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h2>Error loading posts</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>React Query Posts Demo</h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {isFetching ? "Refreshing..." : "Refetch Posts"}
        </button>
        {isFetching && <span>Updating in background...</span>}
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ marginTop: 0 }}>{post.title}</h3>
            <p style={{ marginBottom: 0 }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
