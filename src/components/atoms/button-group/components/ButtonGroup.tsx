import React from 'react'
import MuiButtonGroup from '@mui/material/ButtonGroup'
import { Button } from '../../button/components/Button'
import { ButtonGroupProps } from '../types/buttonGroup.types'
import { buttonGroupStyles } from '../styles/buttonGroup.styles'

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = 'medium',
  numOfButtons = 2,
  hasIcon = false,
  hasLabel = true,
  activeIndex,
  label = '',
  onClick = (index: number) => {},
  icon = ''
}) => {
  const renderButtons = () => {
    const buttons = []
    for (let i = 0; i < numOfButtons; i++) {
      buttons.push(
        // @ts-ignore because can be conditional content
        <Button
          key={i}
          variant={i === activeIndex ? 'solid' : 'outlined'}
          content={hasIcon ? (hasLabel ? 'iconText' : 'iconOnly') : 'textOnly'}
          size={size}
          text={hasLabel ? label : ''}
          onClick={() => onClick(i)}
          icon={icon}
        />
      )
    }
    return buttons
  }

  return (
    <MuiButtonGroup
      sx={{
        ...buttonGroupStyles()
      }}
      orientation='horizontal'
      variant='outlined'
    >
      {renderButtons()}
    </MuiButtonGroup>
  )
}
