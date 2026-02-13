'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/useAuthStore';

export default function NewPostPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Auto-generate slug if empty
        const postData = {
            ...form,
            slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        };

        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (!res.ok) throw new Error('Failed to create post');

            alert('Success: Post created successfully');
            router.push('/blog');
        } catch (error) {
            console.error(error);
            alert('Error: Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display tracking-tight text-foreground">New Post</h1>
                    <p className="text-muted-foreground">Share your pitmaster wisdom.</p>
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
                        <p className="text-xs text-muted-foreground">Leave blank to auto-generate from title.</p>
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
                    <Button type="submit" disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Create Post'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
