
export default interface RoundedButtonProps {
    size : 'small' | 'medium' | 'large',
    style : 'solid' | 'outlined' | 'plain',
    loading? : boolean,
    disabled? : boolean,
    onClick? : () => void
}