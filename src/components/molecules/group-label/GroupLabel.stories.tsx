import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {GroupLabel} from "./GroupLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CustomChip from "../../../@core/components/mui/chip";
import Icon from "../../../@core/components/icon";

interface DataLabelProps {
  label: string;
  data: string;
}
const DataLabel = ({label, data}: DataLabelProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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

const GroupLabelWithForm = (props: any) => {
  return (
    <GroupLabel {...props}>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 18px'
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <Stack
            sx={{
              width: 1,
              marginRight: '8px'
            }}
          >
            <Typography variant='labelMd' fontWeight='bold'>
              Email
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={1}
            />
          </Stack>
          <Stack
            sx={{
              width: 1,
              marginLeft: '8px'
            }}
          >
            <Typography variant='labelMd' fontWeight='bold'>
              Phone Number
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={1}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Stack
            sx={{
              width: 1,
              marginRight: '8px'
            }}
          >
            <Typography variant='labelMd' fontWeight='bold'>
              Password
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={1}
            />
          </Stack>
          <Stack
            sx={{
              width: 1,
              marginLeft: '8px'
            }}
          >
            <Typography variant='labelMd' fontWeight='bold'>
              Confirm Password
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={1}
            />
          </Stack>
        </Box>
      </Box>
    </GroupLabel>
  )
}

const GroupLabelWithDataLabel = (props: any) => {
  return (
    <GroupLabel {...props}>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '24px 18px'
        }}
      >
        <DataLabel
          label="Gate Pass Number :"
          data="Waste/BMO/008"
        />
        <DataLabel
          label="Issued By :"
          data="John Doe"
        />
        <DataLabel
          label="Department :"
          data="Department BMO"
        />
      </Box>
    </GroupLabel>
  )
}

const GroupLabelDataLabelWithCustomHeaderRight = (props: any) => {
  return (
    <GroupLabel
      {...props}
      rightHeader={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Icon
            icon='tabler:copy'
            fontSize={22}
          />
          <CustomChip
            rounded
            label='Active'
            skin='light'
            color='success'
            sx={{
              width: 1,
              borderRadius: '24px',
              ml: '10px'
            }}
          />
        </Box>
      }
    >
      <Box
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '24px 18px'
        }}
      >
        <DataLabel
          label="Gate Pass Number :"
          data="Waste/BMO/008"
        />
        <DataLabel
          label="Issued By :"
          data="John Doe"
        />
        <DataLabel
          label="Department :"
          data="Department BMO"
        />
      </Box>
    </GroupLabel>
  )
}

export default {
  title: 'Components/Molecules/GroupLabel',
  component: GroupLabel,
  argTypes: {
    label: { defaultValue: '' },
    style: { defaultValue: 'header' },
    iconName: { defaultValue: null },
    color: { defaultValue: 'primary' }
  }
} as ComponentMeta<typeof GroupLabel>

const TemplateForm: ComponentStory<typeof GroupLabel> = args => <GroupLabelWithForm {...args} />
const TemplateData: ComponentStory<typeof GroupLabel> = args => <GroupLabelWithDataLabel {...args} />
const TemplateDataWithCustomHeaderRight: ComponentStory<typeof GroupLabel> = args => <GroupLabelDataLabelWithCustomHeaderRight {...args} />

export const AccentHeader = TemplateForm.bind({})
AccentHeader.args = {
  label: 'Account',
  color: 'accent',
  style: 'header',
}

export const AccentHeader1 = TemplateDataWithCustomHeaderRight.bind({})
AccentHeader1.args = {
  label: 'Gate Pass Information',
  color: 'accent',
  style: 'header'
}

export const DefaultText = TemplateForm.bind({})
DefaultText.args = {
  label: 'Account',
  style: 'text',
}

export const PrimaryHeader = TemplateForm.bind({})
PrimaryHeader.args = {
  label: 'Account',
  color: 'primary',
  style: 'header',
}

export const PrimaryHeader1 = TemplateData.bind({})
PrimaryHeader1.args = {
  label: 'Gate Pass Information',
  color: 'primary',
  style: 'header',
  iconName: 'solar:refresh-circle-linear'
}
