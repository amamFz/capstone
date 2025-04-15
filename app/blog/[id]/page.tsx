// app/blog/[id]/page.tsx
import { cookies } from "next/headers"; 
import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const supabase = createServerClient();

  // 1. Fetch satu post berdasarkan ID
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  // 2. Error handling
  if (error || !posts) {
    // Jika error atau data tidak ada → 404
    notFound();
  }

  // 3. Render konten detail
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-6">
          ← Kembali ke Blog
        </Button>
      </Link>

      <h1 className="text-4xl font-bold mb-4">{posts.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {new Date(posts.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" • "}
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
          {posts.category}
        </span>
      </p>

      {posts.image_url && (
        <img
          src={posts.image_url}
          alt={posts.title}
          className="w-full max-h-[400px] object-cover mb-8"
        />
      )}

      <article className="prose prose-lg">
        {/* 
          Misal Anda punya kolom `content` berisi HTML atau Markdown.
          Jika Markdown, gunakan MDX atau parser Markdown.
        */}
        <div
          dangerouslySetInnerHTML={{ __html: posts.content }}
        />
      </article>
    </div>
  );
}
