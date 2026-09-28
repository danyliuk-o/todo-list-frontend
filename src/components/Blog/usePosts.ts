import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

const postsQueryKey = ["posts"];

export function usePostsQuery() {
  return useQuery({ queryKey: postsQueryKey, queryFn: fetchPosts });
}
