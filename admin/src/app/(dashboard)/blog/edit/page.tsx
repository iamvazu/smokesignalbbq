'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/useAuthStore';

// Main component that uses useSearchParams needs to be wrapped in Suspense for static export
function EditPostContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const token = useAuthStore((state) => state.token);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // @ts-ignore
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        published: false
    });

    useEffect(() => {
        const fetchPost = async () => {
            if (!id || !token) return;
            try {
                // Fetch from the new admin-specific endpoint
                const res = await fetch(`${API_URL}/posts/admin/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch post');

                const data = await res.json();
                setForm({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    coverImage: data.coverImage || '',
                    published: data.published
                });
            } catch (error) {
                console.error(error);
                alert('Error: Failed to load post');
                router.push('/blog');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, token, API_URL, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error('Failed to update post');

            alert('Success: Post updated successfully');
            router.push('/blog');
        } catch (error) {
            console.error(error);
            alert('Error: Failed to update post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading post details...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display tracking-tight text-foreground">Edit Post</h1>
                    <p className="text-muted-foreground">Update your content.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 p-6 border border-border bg-card rounded-xl">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. The Secret to Perfect Brisket Bark"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                            id="slug"
                            placeholder="auto-generated-from-title"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Unique identifier for the URL.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Short summary for the blog listing..."
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            rows={3}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                            id="coverImage"
                            placeholder="https://..."
                            value={form.coverImage}
                            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your story here..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="min-h-[400px] font-mono text-sm leading-relaxed"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="space-y-0.5">
                            <Label className="text-base" htmlFor="published">Published</Label>
                            <p className="text-xs text-muted-foreground">Visible to the public immediately.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                checked={form.published}
                                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={saving} className="gap-2">
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Update Post'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default function EditPostPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
            <EditPostContent />
        </Suspense>
    );
}
