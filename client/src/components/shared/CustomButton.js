import React          from 'react';
import { makeStyles } from '@material-ui/core'
import Button         from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  btn: {
    lineHeight: 1,
    margin: 0,
    padding: '10px',
    fontSize: 16,
    color: 'var(--dark-white)',
    borderRadius: 'var(--radius-1)',
    transform: 'scale(0.97)',
    transition: 'all 0.1s linear',
    "&:hover": {
      color: 'var(--white)',
      transform: 'scale(1)'
    }
  },

  btnWhite: {
    color: '#333',
    backgroundColor: theme.palette.white.main,
    "&:hover": {
      color: 'black',
      backgroundColor: theme.palette.white.light,
    }
  },

  btnLight: {
    color: '#333',
    backgroundColor: theme.palette.light.main,
    "&:hover": {
      color: 'black',
      backgroundColor: theme.palette.light.light,
    }
  },
  
  btnRed: {
    backgroundColor: theme.palette.red.main,
    "&:hover": {
      backgroundColor: theme.palette.red.light,
    }
  },

  btnOrange: {
    backgroundColor: theme.palette.orange.main,
    "&:hover": {
      backgroundColor: theme.palette.orange.light,
    }
  },

  btnYellow: {
    backgroundColor: theme.palette.yellow.main,
    "&:hover": {
      backgroundColor: theme.palette.yellow.light,
    }
  },

  btnOlive: {
    backgroundColor: theme.palette.olive.main,
    "&:hover": {
      backgroundColor: theme.palette.olive.light,
    }
  },

  btnGreen: {
    backgroundColor: theme.palette.green.main,
    "&:hover": {
      backgroundColor: theme.palette.green.light,
    }
  },

  btnTeal: {
    backgroundColor: theme.palette.teal.main,
    "&:hover": {
      backgroundColor: theme.palette.teal.light,
    }
  },

  btnCyan: {
    backgroundColor: theme.palette.cyan.main,
    "&:hover": {
      backgroundColor: theme.palette.cyan.light,
    }
  },

  btnBlue: {
    backgroundColor: theme.palette.blue.main,
    "&:hover": {
      backgroundColor: theme.palette.blue.light,
    }
  },

  btnViolet: {
    backgroundColor: theme.palette.violet.main,
    "&:hover": {
      backgroundColor: theme.palette.violet.light,
    }
  },

  btnPink: {
    backgroundColor: theme.palette.pink.main,
    "&:hover": {
      backgroundColor: theme.palette.pink.light,
    }
  },

  btnPurple: {
    backgroundColor: theme.palette.purple.main,
    "&:hover": {
      backgroundColor: theme.palette.purple.light,
    }
  },

  btnIndigo: {
    backgroundColor: theme.palette.indigo.main,
    "&:hover": {
      backgroundColor: theme.palette.indigo.light,
    }
  },

  btnBrown: {
    backgroundColor: theme.palette.brown.main,
    "&:hover": {
      backgroundColor: theme.palette.brown.light,
    }
  },

  btnGray: {
    backgroundColor: theme.palette.gray.main,
    "&:hover": {
      backgroundColor: theme.palette.gray.light,
    }
  },

  btnDark: {
    backgroundColor: theme.palette.dark.main,
    "&:hover": {
      backgroundColor: theme.palette.dark.light,
    }
  },

  btnBlack: {
    backgroundColor: theme.palette.black.main,
    "&:hover": {
      backgroundColor: theme.palette.black.light,
    }
  }
}));


// The switch and the classes will need to get a lot more sophisticated with the
// additional consideration of the variant.


export const CustomButton = React.forwardRef(function CustomButton({ variant = "text", color, className, ...other }, ref){
  const classes = useStyles();
  let btnColor  = null;

  switch(color){
    case 'white':  btnColor = classes.btnWhite;  break;
    case 'light':  btnColor = classes.btnLight;  break;
    case 'red':    btnColor = classes.btnRed;    break;
    case 'orange': btnColor = classes.btnOrange; break;
    case 'yellow': btnColor = classes.btnYellow; break;
    case 'olive':  btnColor = classes.btnOlive;  break;
    case 'green':  btnColor = classes.btnGreen;  break;
    case 'teal':   btnColor = classes.btnTeal;   break;
    case 'cyan':   btnColor = classes.btnCyan;   break;
    case 'blue':   btnColor = classes.btnBlue;   break;
    case 'violet': btnColor = classes.btnViolet; break;
    case 'pink':   btnColor = classes.btnPink;   break;
    case 'purple': btnColor = classes.btnPurple; break;
    case 'indigo': btnColor = classes.btnIndigo; break;
    case 'brown':  btnColor = classes.btnBrown;  break;
    case 'gray':   btnColor = classes.btnGray;   break;
    case 'dark':   btnColor = classes.btnDark;   break;
    case 'black':  btnColor = classes.btnBlack;  break;
    default:       btnColor = classes.btnBlue;
  }

  return (
    <Button
      {...other}
      variant={variant}
      className={`${classes.btn} ${btnColor} ${className}`}
      ref={ref}
    />
  );
});