import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '../components/Button';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

interface BlogPostFull {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    createdAt: string;
}

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostFull | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${API_URL}/posts/${slug}`);
                setPost(res.data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center text-fire">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-4xl font-display text-cream mb-4">Post Not Found</h1>
                <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-charcoal text-cream pb-24">
            {/* Header Image */}
            <div className="relative min-h-[50vh] md:h-[65vh] w-full flex flex-col justify-end">
                <img
                    src={post.coverImage || '/pitmaster.jpg'}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

                <div className="relative z-10 w-full pt-32 pb-12 px-8 container mx-auto">
                    <Button
                        onClick={() => navigate('/blog')}
                        variant="outline"
                        className="mb-8 border-white/20 text-white hover:bg-white/10 w-fit backdrop-blur-sm"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Button>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl italic leading-tight mb-8 drop-shadow-2xl max-w-5xl">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-fire" />
                            {new Date(post.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={16} className="text-fire" />
                            Pitmaster
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 mt-12 max-w-3xl">
                <div className="prose prose-invert prose-lg md:prose-xl prose-fire max-w-none">
                    {/* Basic rendering of potential markdown or plain text.
                        Ideally, use a markdown renderer if content is markdown.
                        For now, simple whitespace preservation. */}
                    <div
                        className="blog-post-content leading-relaxed space-y-6 text-gray-300 font-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                <div className="mt-20 border-t border-white/10 pt-12 text-center">
                    <h3 className="font-display text-2xl italic mb-6">Enjoyed this post?</h3>
                    <Button onClick={() => navigate('/shop')} variant="primary" className="px-8 py-4 text-lg">
                        Order Authentic BBQ Now
                    </Button>
                </div>
            </div>
        </article>
    );
};
