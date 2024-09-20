import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Carousel } from './Carousel'
import { env } from 'next-runtime-env'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Carousel',
  component: Carousel
} as ComponentMeta<typeof Carousel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = args => (
  <Carousel {...args}>
    <img src={`${env('NEXT_PUBLIC_BASE_URL')}/images/banners/banner-1.jpg`} alt='swiper 1' />
    <img src={`${env('NEXT_PUBLIC_BASE_URL')}/images/banners/banner-2.jpg`} alt='swiper 2' />
  </Carousel>
)

export const Default = Template.bind({})
Default.args = {
  currentSlide: 0
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
