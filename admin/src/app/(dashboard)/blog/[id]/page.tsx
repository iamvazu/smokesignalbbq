'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/use-toast';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const token = useAuthStore((state) => state.token);
    const [loading, setLoading] = useState(true);
    // @ts-ignore
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    const [post, setPost] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        published: false
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // We need to fetch from the backend. Since the specialized public endpoint is by slug, 
                // but admins might need to edit drafted posts (which might not be fetchable by public slug endpoint if it filters published),
                // we might need an admin endpoint for single post by ID.
                // However, let's use the public slug endpoint if published, or wait - we didn't create a "get single post admin" endpoint yet!
                // We only made getAllPostsAdmin. 
                // I should have made getPostByIdAdmin in the controller.
                // But let's see if we can use the list to find it or if we should add the endpoint.
                // It's cleaner to have a getById.
                // For now, I will try fetching from the public endpoint if it allows drafts (it doesn't).
                // I will update the backend controller to include `getPostById` for admin.

                // Let's quickly fix the backend first.
            } catch (error) {
                console.error(error);
            }
        };
        // fetchPost(); 
    }, [id, token]);

    // ... rest of component
    return <div>Work in progress...</div>;
} 
