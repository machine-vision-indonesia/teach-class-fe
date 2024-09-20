export interface ButtonGroupProps {
    size: 'small' | 'medium' | 'large';
    numOfButtons: 2 | 3 | 4;
    hasIcon: boolean;
    hasLabel: boolean;
    activeIndex?: number;
    label?: string;
    onClick?: (index: number) => void;
    icon?: string
}