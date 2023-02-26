export type PayloadOptions<T = unknown> = T & {
  signal: AbortSignal
}
