import * as React from 'react';
import { Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import ExampleProps from '../types/Example.types';
import IconifyIcon from '@/@core/components/icon';

/**
 * Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
 * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
 * when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
 * It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
 * It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
 * and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 */
export const Example: React.FC<ExampleProps> = ({ 
  badgeStyle = 'rect', 
  content = 'all', 
  color = 'primary', 
  size = 'medium',
  badgeContent = 'Label',
  children,
  ...otherProps 
}: ExampleProps) => {

  // Render Condition
  const getBadgeContent = () => {
    if (content === 'text') {
      return null;
    } else if (content === 'icon') {
      return <IconifyIcon fontSize={ size === 'small' ? '8px' : '10px'} icon={'material-symbols:circle-outline'} />
    } else {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '2px', justifyContent: 'center' }}>
          {<IconifyIcon fontSize={ size === 'small' ? '8px' : '10px'} icon={'material-symbols:circle-outline'} />}
          {badgeContent}
        </Box>
      );
    }
  };

  return (
    <Badge
      {...otherProps}
      badgeContent={getBadgeContent()}
      sx={{ '& .MuiBadge-badge': {
        borderRadius: badgeStyle === 'circular' ? '1000px' : '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: `${color}.main`,
        fontSize: size === 'small' ? '10px' : '12px',
        fontWeight: 100,
        color: color === 'warning' ? 'black' : 'white'
      }
    }}
    >
      {children}
    </Badge>
  );
}