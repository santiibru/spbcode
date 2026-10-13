import type { NextFunction, Request, Response } from "express";

// Límite simple en memoria por IP (suficiente para una sola instancia del servidor)
export function rateLimit({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; reset: number }>();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, h] of hits) if (h.reset <= now) hits.delete(ip);
  }, windowMs).unref();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip ?? "unknown";
    const now = Date.now();
    const h = hits.get(ip);
    if (!h || h.reset <= now) {
      hits.set(ip, { count: 1, reset: now + windowMs });
      return next();
    }
    if (++h.count > max) {
      res.setHeader("Retry-After", Math.ceil((h.reset - now) / 1000));
      res.locals.limited = true;
    }
    next();
  };
}
