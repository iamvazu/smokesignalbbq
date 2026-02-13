import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '../components/Button';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    createdAt: string;
}

export const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${API_URL}/posts`);
                setPosts(res.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center">
                <Loader2 className="animate-spin text-fire" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-charcoal min-h-screen text-cream">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-burnt/10 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-fire uppercase tracking-[0.3em] text-sm font-bold block mb-4">The Pitmaster's Log</span>
                        <h1 className="font-display text-5xl md:text-7xl italic mb-6">Smoke Signals</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Tips, tales, and techniques from the heart of the pit. Learn about authentic Texas BBQ, our journey, and the science of smoke.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="font-display text-2xl text-gray-500">No posts found yet. The smoker is warming up.</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden group hover:border-fire/30 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={post.coverImage || '/pitmaster.jpg'}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <span className="text-fire text-xs font-bold uppercase tracking-widest">
                                                {new Date(post.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="font-display text-2xl mb-4 group-hover:text-fire transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 mb-8 line-clamp-3 text-sm leading-relaxed flex-1">
                                            {post.excerpt}
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate(`/blog/${post.slug}`)}
                                            className="w-full justify-center group-hover:bg-fire group-hover:text-white group-hover:border-fire transition-all"
                                        >
                                            Read Article
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
