import { Card } from "@mui/material";
import { PropsStripCard } from "./StripCard.type";

export const StripCard = ({ children, color = 'primary', accent = 'left' }: PropsStripCard) => {
  const resolveBorderColor = () => {
    switch(color) {
      case 'primary':
        return '#005EFF'
      case 'secondary':
        return '#909094'
      case 'error':
        return '#DA1631'
      case 'warning':
        return '#FA7322'
      case 'success':
        return '#13B25A'
      case 'info':
        return '##005EFF'
      default:
        return '#005EFF'
    }
  }
  const border = `8px solid ${resolveBorderColor()}`

  let style = {}
  switch(accent) {
    case 'left': {
      style = {
        borderLeft: border,
      }
      break;
    }
    case 'bottom': {
      style = {
        borderBottom: border,
      }
      break;
    }
    case 'right': { 
      style = {
        borderRight: border,
      }
      break;
    }
    case 'top': {
      style = {
        borderTop: border,
      }
      break; 
    }
    case 'vertical': {
      style = {
        borderLeft: border,
        borderRight: border,
      }
      break; 
    }
    case 'horizontal': {
      style = {
        borderTop: border,
        borderBottom: border,
      }
      break; 
    } 
    default: { 
      style = {
        borderLeft: border,
      }
      break; 
    } 
 }

  return (
    <Card sx={style}>
      {children}
    </Card>
  );
}