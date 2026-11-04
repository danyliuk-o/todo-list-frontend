"use client";

import type { FC } from "react";
import Image from "next/image";
import { usePostsQuery } from "./usePosts";

const Blog: FC = () => {
  const { data: posts = [], isPending, error } = usePostsQuery();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-border bg-header p-4 text-left"
        >
          {post.image_url && (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-md">
              {/* unoptimized: the image comes straight from Strapi, not through Next's optimizer */}
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </li>
      ))}
    </ul>
  );
};

export default Blog;
