import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
// import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const BlogPage = () => {
  //   const data = useQuery(api.posts.getPosts); // client component

  //   const data = await fetchQuery(api.posts.getPosts); // server component
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blogs
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Read the latest blogs from our community!
        </p>
      </div>
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="pt-0">
                <div className="h-48 w-full overflow-hidden relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <LoadBlog />
      </Suspense>
    </div>
  );
};

export default BlogPage;

const LoadBlog = async () => {
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="h-48 w-full overflow-hidden relative">
            <Image
              fill
              src={
                "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="image"
              className="rounded-t-lg"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-2xl font-semibold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link
              href={`/blog/${post._id}`}
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Read More..
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
