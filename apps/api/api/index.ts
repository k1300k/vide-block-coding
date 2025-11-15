import type { IncomingMessage, ServerResponse } from 'http';

// Vercel (or other serverless) will execute this handler. It imports the built `dist/index.js`.
// Ensure the project is built before running serverless functions (Vercel build step).

let appReady: Promise<void> | null = null;
let appInstance: any = null;

async function ensureApp() {
  if (appReady) return appReady;

  appReady = (async () => {
    // When importing the built module, prevent it from starting its own HTTP server
    process.env.START_HTTP = 'false';

    // Import compiled dist entry
    const mod = await import('../dist/index.js');

    // `app` should be exported from src/index.ts after our changes
    appInstance = mod.app;

    if (!appInstance) {
      throw new Error('Failed to load Fastify app from dist/index.js');
    }

    await appInstance.ready();
  })();

  return appReady;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await ensureApp();

    // Fastify exposes the underlying Node server. Emit a request to it.
    // This effectively forwards the serverless request to Fastify's router.
    appInstance.server.emit('request', req, res);
  } catch (err: any) {
    console.error('Serverless handler error:', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || 'internal error' }));
  }
}
