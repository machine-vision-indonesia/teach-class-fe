import { BadgeProps } from '@mui/material';

export default interface ExampleProps extends Omit<BadgeProps, 'variant' | 'color'> {
    badgeStyle?: 'rect' | 'circular';
    size?: 'small' | 'medium';
    content?: 'all' | 'text' | 'icon';
    color?: 'primary' | 'neutral' | 'neutral-inverted' | 'danger' | 'warning' | 'success' | 'info';
}
