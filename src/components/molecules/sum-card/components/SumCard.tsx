import { Card } from '@mui/material'
import Icon from '../../../../@core/components/icon'
import { PropsSumCard } from '../types/SumCard.type'
import { SumCardRight } from './SumCardRight'
import { SumCardLeft } from './SumCardLeft'

export const SumCard = ({
  style = 'elevation',
  variant = 'left',
  title,
  description,
  totalNumber = 0,
  statusLabel,
  icon = <Icon icon='octicon:people-24' />,
  backgroundIconColor
}: PropsSumCard) => {
  const conditionalRender = () => {
    switch (variant) {
      case 'left':
        return (
          <SumCardLeft
            icon={icon}
            backgroundIconColor={backgroundIconColor}
            total={totalNumber}
            statusLabel={statusLabel}
          />
        )
      case 'right':
        return (
          <SumCardRight
            icon={icon}
            backgroundIconColor={backgroundIconColor}
            title={title}
            description={description}
            total={totalNumber}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <Card
      variant={style}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {conditionalRender()}
    </Card>
  )
}
