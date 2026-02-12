const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function build() {
    try {
        console.log('🚀 Starting Monolith Build...');

        // 1. Build Main Site (Vite)
        console.log('📦 Building Main Site...');
        execSync('npm run build', { stdio: 'inherit' });

        // 2. Build Admin Dashboard (Next.js)
        console.log('📦 Building Admin Dashboard...');
        execSync('npm run build --prefix admin', { stdio: 'inherit' });

        // 3. Prepare Backend Public Folder
        console.log('📂 Preparing Backend Public folder...');
        const publicDir = path.join(__dirname, 'backend', 'public');
        await fs.ensureDir(path.join(publicDir, 'main'));
        await fs.ensureDir(path.join(publicDir, 'admin'));

        // 4. Move Main Site
        console.log('🚚 Moving Main Site to Backend...');
        await fs.emptyDir(path.join(publicDir, 'main'));
        await fs.copy(path.join(__dirname, 'dist'), path.join(publicDir, 'main'));

        // 5. Move Admin Dashboard
        console.log('🚚 Moving Admin Dashboard to Backend...');
        await fs.emptyDir(path.join(publicDir, 'admin'));
        await fs.copy(path.join(__dirname, 'admin', 'out'), path.join(publicDir, 'admin'));

        // 6. Build Backend (TypeScript)
        console.log('📦 Building Backend... (Compiling TS)');
        execSync('npm run build --prefix backend', { stdio: 'inherit' });

        console.log('✅ Monolith Build Complete!');
    } catch (err) {
        console.error('❌ Build failed:', err);
        process.exit(1);
    }
}

build();
