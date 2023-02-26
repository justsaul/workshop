export type HttpOptions<T = unknown> = T & Partial<{ signal: AbortSignal }>
