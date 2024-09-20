import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Link as MUILink } from '@mui/material'
import { Button } from 'src/components/atoms'
import { ModalImage } from './ModalImage'

const ModalComponents = (props: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant='contained' content='textOnly' text='Open Modal' onClick={() => setOpen(true)} />
      <ModalImage {...props} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

const ModalComponentsWithAnchor = (props: any) => {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <ul>
        <li>
          <MUILink
            variant='body2'
            onClick={() => {
              setOpen(true)
              setImageUrl(
                'https://www.cnet.com/a/img/resize/dfd8b4f175537bda78f81eae02fa99a1a9a07aba/hub/2019/11/01/f0dcfa53-dc09-408d-bd78-a3a2e8db0c61/macbook-air-hgg-promo.jpg?auto=webp&fit=crop&height=675&width=1200'
              )
            }}
          >
            Image 1
          </MUILink>
        </li>
        <li>
          <MUILink
            variant='body2'
            onClick={() => {
              setOpen(true)
              setImageUrl(
                'https://images.news18.com/ibnlive/uploads/2023/10/macbook-air-m1-2023-10-c3ced763eda4931bd195f9e7ff255169-3x2.jpg'
              )
            }}
          >
            Image 2
          </MUILink>
        </li>
      </ul>

      <ModalImage {...props} isOpen={open} imageUrl={imageUrl} onClose={() => setOpen(false)} />
    </>
  )
}

export default {
  title: 'Components/Molecules/ModalImage',
  argTypes: {},
  component: ModalImage
} as ComponentMeta<typeof ModalImage>

const Template: ComponentStory<typeof ModalImage> = args => <ModalComponents {...args} />
const TemplateWithAnchor: ComponentStory<typeof ModalImage> = args => <ModalComponentsWithAnchor {...args} />

export const Default = Template.bind({})
Default.args = {
  imageUrl:
    'https://www.cnet.com/a/img/resize/dfd8b4f175537bda78f81eae02fa99a1a9a07aba/hub/2019/11/01/f0dcfa53-dc09-408d-bd78-a3a2e8db0c61/macbook-air-hgg-promo.jpg?auto=webp&fit=crop&height=675&width=1200'
}

export const ModalOpenWithLink = TemplateWithAnchor.bind({})
ModalOpenWithLink.args = {
  imageUrl:
    'https://www.cnet.com/a/img/resize/dfd8b4f175537bda78f81eae02fa99a1a9a07aba/hub/2019/11/01/f0dcfa53-dc09-408d-bd78-a3a2e8db0c61/macbook-air-hgg-promo.jpg?auto=webp&fit=crop&height=675&width=1200'
}
