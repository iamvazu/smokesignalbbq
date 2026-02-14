import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import crypto from 'crypto';

// SECURITY: Use RS256 for asymmetric signing
// In production, these should be loaded from a secure Secrets Manager
// For now, we use placeholders but enforce the architecture
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || process.env.JWT_SECRET || '';
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') || process.env.JWT_SECRET || '';

if (!PRIVATE_KEY && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  WARNING: No JWT_PRIVATE_KEY or JWT_SECRET found. Authentication will fail.');
}

// SECURITY: Argon2id settings for PCI-DSS/OWASP compliance
const ARGON_CONFIG = {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 4
};

export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password, ARGON_CONFIG);
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(hash, password);
    } catch {
        return false;
    }
};

export const generateAccessToken = (payload: object): string => {
    // SECURITY: Access tokens expire in 15 minutes max
    return jwt.sign(payload, PRIVATE_KEY || 'development_secret', {
        algorithm: PRIVATE_KEY ? 'RS256' : 'HS256',
        expiresIn: '15m'
    });
};

export const generateRefreshToken = (payload: object): string => {
    // SECURITY: Use CSPRNG for refresh tokens
    return crypto.randomBytes(40).toString('hex');
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, PUBLIC_KEY || 'development_secret', {
        algorithms: PRIVATE_KEY ? ['RS256'] : ['HS256']
    });
};

// SECURITY: AES-256-GCM for PII data protection at rest
const ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';

export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
};

export const decrypt = (cipherText: string): string => {
    const [ivHex, authTagHex, encrypted] = cipherText.split(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

