import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Popover, useTheme } from '@mui/material'
import { differenceInSeconds, format } from 'date-fns'
import React, { useState } from 'react'
import { ProgressTimelineProps } from '../types/progressTimeline.types'

const ProgressTimeline = ({ title, instructionData = [] }: ProgressTimelineProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [instructionId, setInstructionId] = useState<any>(null)

  const calculateTimelineCalibration = (data: any) => {
    const diffTime = differenceInSeconds(data.end, data.start)
    const totalDiffTime = differenceInSeconds(instructionData[instructionData.length - 1].end, instructionData[0].start)

    const percentage = (diffTime / totalDiffTime) * 100
    return percentage
  }

  const intToHexColor = (incrementId: any) => {
    function seededRandom(seed: any) {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    const red = Math.floor(seededRandom(incrementId) * 256)
    const green = Math.floor(seededRandom(incrementId + 1) * 256)
    const blue = Math.floor(seededRandom(incrementId + 2) * 256)

    const hexColor = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()
    return hexColor
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, id: any) => {
    setAnchorEl(event.currentTarget)
    setInstructionId(id)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setInstructionId(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box
      sx={{
        padding: '16px',
        borderRadius: '6px',
        border: `1px solid ${theme.colorToken.border.neutral.normal}`
      }}
    >
      <MvTypography size='TITLE_XS' typeSize='PX'>
        {title}
      </MvTypography>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px', gap: '8px', marginBottom: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MvTypography size='TITLE_XS' typeSize='PX'>
            {instructionData.length > 0 ? format(instructionData[0].start, 'hh:mm') : '00:00'}
          </MvTypography>
          <MvTypography size='TITLE_XS' typeSize='PX'>
            {instructionData.length > 0 ? format(instructionData[instructionData.length - 1].end, 'hh:mm') : '00:00'}
          </MvTypography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {instructionData.length > 0 ? (
          instructionData.map((v: any, i: any) => {
            if (i == 0) {
              return (
                <Box
                  key={i}
                  aria-owns={open ? 'hover-popover-timeline' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={e => handlePopoverOpen(e, v.id)}
                  onMouseLeave={handlePopoverClose}
                  sx={{
                    height: '34px',
                    backgroundColor: `${intToHexColor(v.id)}`,
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                    width: `${calculateTimelineCalibration(v)}%`
                  }}
                />
              )
            }
            if (i === instructionData.length - 1) {
              return (
                <Box
                  key={i}
                  aria-owns={open ? 'hover-popover-timeline' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={e => handlePopoverOpen(e, v.id)}
                  onMouseLeave={handlePopoverClose}
                  sx={{
                    height: '34px',
                    backgroundColor:
                      instructionData.length === 0
                        ? theme.colorToken.background.neutral.subtle
                        : `${intToHexColor(v.id)}`,
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                    width: `${calculateTimelineCalibration(v)}%`
                  }}
                />
              )
            }
            return (
              <Box
                aria-owns={open ? 'hover-popover-timeline' : undefined}
                aria-haspopup='true'
                onMouseEnter={e => handlePopoverOpen(e, v.id)}
                onMouseLeave={handlePopoverClose}
                key={i}
                sx={{
                  height: '34px',
                  backgroundColor:
                    instructionData.length === 0
                      ? theme.colorToken.background.neutral.subtle
                      : `${intToHexColor(v.id)}`,
                  width: `${calculateTimelineCalibration(v)}%`
                }}
              />
            )
          })
        ) : (
          <Box
            sx={{
              height: '34px',
              backgroundColor: theme.colorToken.background.neutral.subtle,
              borderRadius: '6px',
              width: `100%`
            }}
          />
        )}

        <Popover
          id='hover-popover-timeline'
          sx={{ pointerEvents: 'none' }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box
            sx={{
              paddingInline: '16px',
              paddingBlock: '6px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '100px',
              maxWidth: '500px'
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MvTypography size='TITLE_XS' typeSize='PX'>
                {instructionData?.find((obj: any) => obj.id === instructionId)
                  ? format(instructionData?.find((obj: any) => obj.id === instructionId)?.start, 'hh:mm')
                  : '-'}
              </MvTypography>
              <MvTypography size='TITLE_XS' typeSize='PX'>
                -
              </MvTypography>
              <MvTypography size='TITLE_XS' typeSize='PX'>
                {instructionData?.find((obj: any) => obj.id === instructionId)
                  ? format(instructionData?.find((obj: any) => obj.id === instructionId)?.end, 'hh:mm')
                  : '-'}
              </MvTypography>
            </Box>
            <MvTypography
              sx={{ marginTop: '8px' }}
              size='BODY_LG_NORMAL'
              color={theme.colorToken.text.neutral.subtle}
              typeSize='PX'
            >
              Instruction
            </MvTypography>
            <MvTypography size='LABEL_LG_NORMAL' color={theme.colorToken.text.neutral.normal} typeSize='PX'>
              {/* {v.instruction} */}
              {instructionData?.find((obj: any) => obj.id === instructionId)
                ? instructionData?.find((obj: any) => obj.id === instructionId)?.instruction
                : '-'}
            </MvTypography>
          </Box>
        </Popover>
      </Box>
    </Box>
  )
}

export default ProgressTimeline
