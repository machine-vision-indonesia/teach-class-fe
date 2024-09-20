import { Children, type PropsWithChildren, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import { Direction } from '@mui/material'

// ** Icon Imports

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import KeenSliderWrapper from '../../../@core/styles/libs/keen-slider'
import { Icon } from '@iconify/react'

interface PropsCarousel {
  direction?: Direction
  currentSlide: number
  onChangeSlide?: (slide: number) => void
  withControl?: boolean
}

export const Carousel = ({
  direction,
  currentSlide,
  onChangeSlide,
  withControl,
  children
}: PropsWithChildren<PropsCarousel>) => {
  // ** States
  const [loaded, setLoaded] = useState<boolean>(false)

  // const [currentSlide, setCurrentSlide] = useState<number>(0)

  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: direction === 'rtl',
    slideChanged(slider) {
      onChangeSlide?.(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <>
      <KeenSliderWrapper>
        <Box sx={{ position: 'relative' }} className='navigation-wrapper'>
          <Box ref={sliderRef} className='keen-slider'>
            {Children.map(children, (child, i) => (
              <Box key={i} className='keen-slider__slide'>
                {child}
              </Box>
            ))}
            {/* <Box className='keen-slider__slide'>
              <img src='/images/banners/banner-2.jpg' alt='swiper 2' />
            </Box>
            <Box className='keen-slider__slide'>
              <img src='/images/banners/banner-3.jpg' alt='swiper 3' />
            </Box>
            <Box className='keen-slider__slide'>
              <img src='/images/banners/banner-4.jpg' alt='swiper 4' />
            </Box>
            <Box className='keen-slider__slide'>
              <img src='/images/banners/banner-5.jpg' alt='swiper 5' />
            </Box> */}
          </Box>
          {withControl && loaded && instanceRef.current && (
            <>
              <Icon
                icon='tabler:chevron-left'
                className={clsx('arrow arrow-left', {
                  'arrow-disabled': currentSlide === 0
                })}
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              />

              <Icon
                icon='tabler:chevron-right'
                className={clsx('arrow arrow-right', {
                  'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
                })}
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              />
            </>
          )}
          {withControl && loaded && instanceRef.current && (
            <Box
              sx={{ position: 'absolute', bottom: '20px', margin: '0px', width: '100%', gap: '8px' }}
              className='swiper-dots'
            >
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
                return (
                  <Badge
                    sx={{
                      '& .MuiBadge-badge': {
                        height: '5px !important',
                        width: '34px !important',
                        borderRadius: '6px !important'
                      },
                      '&:not(.active)': {
                        '& .MuiBadge-badge': {
                          background: thm => `${thm.palette.placeholder} !important`
                        }
                      }
                    }}
                    key={idx}
                    variant='dot'
                    component='div'
                    className={clsx({
                      active: currentSlide === idx
                    })}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                  ></Badge>
                )
              })}
            </Box>
          )}
        </Box>
      </KeenSliderWrapper>
    </>
  )
}
