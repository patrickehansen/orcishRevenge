export const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    backgroundColor: theme.palette.common.white,
    fontSize: theme.sizing.medium,
  },
  invertColors: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,

    '& label' : {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& legend' : {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& input' : {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& textarea' : {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    }
  },
  textSelect: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,
    minWidth: '11rem',
    marginTop: theme.spacing(1),

    '& label': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& div': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
      fontSize: '1.2rem',
      borderColor: 'black',
      boxShadow: '2px 2px 2px black'
    }
  },
  numberSelect: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,
    minWidth: '11rem',
    width: '11rem',
    marginTop: theme.spacing(1),

    '& label': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& input': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
      fontSize: '1.2rem',
      borderColor: 'black',
      boxShadow: '2px 2px 2px black'
    },

    '& div': {
      mindWidth: '11rem'
    }
  },
  statAdjuster: {
    display: 'flex',
    flexDirection: 'row',
    width: '14rem',
    textAlign: 'center',
    marginLeft: '1rem',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    paddingLeft: '0.3rem',
    paddingRight: '0.3rem',
    marginBottom: '0.2rem',
    backgroundColor: theme.palette.common.blueGray,
    border: 'solid 1px black',
    boxShadow: '2px 2px 2px black',
    borderRadius: '5px',
    color: theme.palette.common.white,
  },
  horizontalTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    flexGrow: 1,
    order: 0,
  },
  statText: {
    margin: 'auto',
    marginLeft: '0.2rem',
    padding: '0',
    textAlign: 'left',
    flexGrow: 1,
  },
  statValue: {
    margin: 'auto',
    float: 'right',
    boxShadow: `inset 1px 1px 3px ${theme.palette.common.dark}`,
    border: 'solid 2px black',
    minWidth: '2rem',
    marginRight: '0.2rem',
  },
  verticalButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  smallButton : {
    minWidth: '2rem',
    width: '2rem',
    boxShadow: '1px 1px 3px black',
    marginBottom: '0.2rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  tinyMargin: {
    marginBottom: '0.2rem',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fixed: {
    flexGrow: 0,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.error.main,
  }
});