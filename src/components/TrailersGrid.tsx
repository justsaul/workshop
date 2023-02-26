import React from 'react'
import { Grid } from '@mui/material'

import { TrailerDetailsCard } from 'src/components/TrailerDetailsCard'
import { Trailer } from 'src/api/trailers.api'

type TrailersGridProps = {
  collection?: Trailer[]
  isLoading: boolean
}

const getActionableCollection = (isLoading: boolean, collection: Trailer[]) =>
  isLoading
    ? [
        { url: 'url', title: 'title', id: 'id0' },
        { url: 'url', title: 'title', id: 'id2' },
        { url: 'url', title: 'title', id: 'id3' },
        { url: 'url', title: 'title', id: 'id4' },
        { url: 'url', title: 'title', id: 'id5' },
        { url: 'url', title: 'title', id: 'id6' },
        { url: 'url', title: 'title', id: 'id7' },
        { url: 'url', title: 'title', id: 'id8' },
      ]
    : collection

export const TrailersGrid: React.FC<TrailersGridProps> = ({
  collection = [],
  isLoading = false,
}) => {
  const actionableCollection = getActionableCollection(isLoading, collection)

  return (
    <Grid container spacing={5} alignItems="center" justifyContent="center">
      {actionableCollection.map((item) => {
        return (
          <Grid item key={`trailer-item-${item.id}`}>
            <TrailerDetailsCard
              url={item.url}
              title={item.title}
              id={item.id}
              isLoading={isLoading}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
