import {ComponentMeta, ComponentStory} from "@storybook/react";
import {HeadingCard} from "./HeadingCard";
import React, {MouseEvent} from "react";
import CustomChip from "../../../@core/components/mui/chip";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface DataLabelProps {
  label: string;
  data: string;
}
const DataLabel = ({label, data}: DataLabelProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '16px'
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: 'text.primary',
          fontSize: '16px'
        }}
      >
        {data}
      </Typography>
    </Box>
  );
}

const HeadingCardChild = () => {
  return (
    <CardContent>
      <CustomChip
        rounded
        size='small'
        skin='light'
        color='secondary'
        label='+15.2%'
        sx={{
          width: '100%',
          mb: '8px'
        }}
      />
      <Box sx={{ mb: '10px' }}>
        <DataLabel
          label="Total Production"
          data="20"
        />
      </Box>
      <Box sx={{ mb: '10px' }}>
        <DataLabel
          label="Target"
          data="69"
        />
      </Box>
      <DataLabel
        label="Std. Cycle Time"
        data="2.0"
      />
    </CardContent>
  )
}

export default {
  title: 'Components/Molecules/HeadingCard',
  component: HeadingCard,
  argTypes: {
    color: { defaultValue: 'primary' },
  }
} as ComponentMeta<typeof HeadingCard>

const Template: ComponentStory<typeof HeadingCard> = args => <HeadingCard {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  label: 'Name Issue',
  children: <HeadingCardChild/>
}

export const HeadingCardWithIcon = Template.bind({})
HeadingCardWithIcon.args = {
  color: 'success',
  label: 'PO - ALVA 1',
  iconName: 'mdi:magnify',
  onIconClick: (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  },
  children: <HeadingCardChild/>
}
