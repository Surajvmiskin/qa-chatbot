interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class Cache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private duration: number;

  constructor(duration: number) {
    this.duration = duration;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.duration;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}