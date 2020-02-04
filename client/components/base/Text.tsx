import React from 'react'
import Typography from '@material-ui/core/Typography'

function Text({ children = '', ...rest }) {
  return (
    <Typography component="p" variant="body1" {...rest}>
      {children}
    </Typography>
  )
}

export default Text
