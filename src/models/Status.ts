export type Status = 'idle' | 'loading' | 'failed'

export type ItemStatus<T> = {
  status: Status
  item: T
}

export type CollectionStatus<T> = {
  status: Status
  collection: T[]
}
