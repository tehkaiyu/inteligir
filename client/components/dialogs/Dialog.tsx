import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grow from '@material-ui/core/Grow'

const useStyles = makeStyles({
  paper: {
    boxShadow: 'none',
    maxWidth: 736,
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    minHeight: 50,
  },
  toolBar: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
})

const Transition = React.forwardRef((props, ref) => {
  return <Grow {...props} ref={ref} />
})

function IntDialog({ children, open, onClose, title, toolbarRight, ...props }) {
  const classes = useStyles()
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      {...props}
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton color="secondary" onClick={onClose} aria-label="Close">
            <ArrowBack />
          </IconButton>
          {!!title && (
            <Typography variant="h6" color="secondary" className={classes.flex}>
              {title}
            </Typography>
          )}
          {!!toolbarRight && toolbarRight}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}

export default IntDialog