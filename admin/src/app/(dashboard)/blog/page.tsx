'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';

// Define Post type
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: string;
    excerpt: string;
}

export default function BlogListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.token);
    // @ts-ignore
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/posts/admin/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error(error);
            // alert('Error: Failed to load posts'); // Don't alert on load, too annoying
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Failed to delete');

            setPosts(posts.filter(p => p.id !== id));
            alert('Success: Post deleted successfully');
        } catch (error) {
            alert('Error: Failed to delete post');
        }
    };

    useEffect(() => {
        if (token) {
            fetchPosts();
        }
    }, [token]);

    if (loading) return <div className="p-8 text-center">Loading posts...</div>;

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display tracking-tight font-bold mb-2">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage your articles and stories.</p>
                </div>
                <Link href="/blog/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[400px]">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No posts found. Write your first story!
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-base text-foreground">{post.title}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-xs">{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={post.published ? 'default' : 'secondary'}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {post.published && (
                                                <a
                                                    href={`http://localhost:5173/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            {/* Link to Edit Page using query param for static export compatibility */}
                                            <Link href={`/blog/edit?id=${post.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="w-4 h-4 text-primary" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deletePost(post.id)}
                                            >
                                                <Trash className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
