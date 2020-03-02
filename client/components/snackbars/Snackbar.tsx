import React from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  info: {
    backgroundColor: blue[600],
  },
  warning: {
    backgroundColor: amber[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const IntSnackbarContent = ({
  className,
  message,
  onClose,
  variant,
  ...rest
}: any) => {
  const classes = useStyles()
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classnames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...rest}
    />
  )
}

const IntSnackbar = ({
  open = false,
  onClose = () => {},
  variant = 'success',
  message = 'This is a success message!',
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <IntSnackbarContent
        onClose={onClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  )
}

export default React.memo(IntSnackbar)
