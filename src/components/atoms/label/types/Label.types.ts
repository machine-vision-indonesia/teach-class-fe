export default interface LabelProps {
  isRequired?: boolean
  size?: 'small' | 'medium' | 'large'
  weight?: 'bolder' | 'normal'
  typeSize?: 'PX' | 'DVW'
  children: React.ReactNode
}
