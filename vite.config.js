import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/MoodMate/', // 👈 Must match your repo name exactly
  plugins: [react()], // 👈 REQUIRED to compile React properly
});
