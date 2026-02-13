import { Router } from 'express';
import {
    getPublishedPosts,
    getPostBySlug,
    getAllPostsAdmin,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/blogController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/', getPublishedPosts);
router.get('/:slug', getPostBySlug);

// Admin Routes (Protected)
router.get('/admin/all', authMiddleware, getAllPostsAdmin);
router.get('/admin/post/:id', authMiddleware, getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);


export default router;
