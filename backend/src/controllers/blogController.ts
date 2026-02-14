import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Get all published posts (Public)
// Optional query param: author? (if we had authors), but mostly just gets all published
export const getPublishedPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Get single post by slug (Public)
export const getPostBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug: String(slug) }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

// Admin: Get all posts (including drafts)
export const getAllPostsAdmin = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Admin: Get single post by ID

// Admin: Get single post by ID
export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id: String(id) }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};


// Admin: Create Post
export const createPost = async (req: Request, res: Response) => {
    const { title, slug, excerpt, content, coverImage, published } = req.body;
    try {
        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage: coverImage || '',
                published: published || false
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('BLOG_CREATE_ERROR:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Admin: Update Post
export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, published } = req.body;
    try {
        const post = await prisma.blogPost.update({
            where: { id: String(id) },
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                published
            }
        });
        res.json(post);
    } catch (error) {
        console.error('BLOG_UPDATE_ERROR:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};

// Admin: Delete Post
export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.blogPost.delete({
            where: { id: String(id) }
        });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

