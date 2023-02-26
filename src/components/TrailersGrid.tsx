import React from 'react'
import { Grid } from '@mui/material'

import { TrailerDetailsCard } from 'src/components/TrailerDetailsCard'
import { Trailer } from 'src/api/trailers.api'

type TrailersGridProps = {
  collection?: Trailer[]
}

export const TrailersGrid: React.FC<TrailersGridProps> = ({
  collection = [],
}) => {
  return (
    <Grid container spacing={5} alignItems="center" justifyContent="center">
      {collection.map((item) => {
        return (
          <Grid item key={`trailer-item-${item.id}`}>
            <TrailerDetailsCard
              url={item.url}
              title={item.title}
              id={item.id}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
