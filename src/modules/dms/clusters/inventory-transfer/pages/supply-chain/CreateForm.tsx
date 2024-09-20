import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Stepper } from '@/components/molecules'
import { Box, Stack, useTheme } from '@mui/material'
import { activeStepAtom, stepDataAtom } from './stores/step.store'
import { useAtom } from 'jotai'
import { StepState } from './constant/step.constant'
import { Step1 } from './components/step1/Step1'
import { Step2 } from './components/step2/Step2'

const PageCreateForm = () => {
  const [stepData] = useAtom(stepDataAtom)
  const [activeStep] = useAtom(activeStepAtom)

  const theme = useTheme()

  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
        Create Inventory Transfer
      </MvTypography>
      <Breadcrumbs
        data={[
          {
            label: 'Home',
            path: '/'
          },
          {
            label: 'Inventory Transfer Request',
            path: 'solutions/dms/inventory-transfer'
          },
          {
            label: 'Create Inventory Transfer',
            path: '/'
          }
        ]}
      />
      <Box
        bgcolor={theme.colorToken.background.neutral.normal}
        borderRadius={'6px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        rowGap={'18px'}
        padding={'32px 24px'}
        marginTop={'12px'}
        width={'100%'}
        border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      >
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          sx={{
            fontSize: '12px'
          }}
        >
          <Box width={'30%'}>
            <Stepper data={stepData} orientation='horizontal' size='medium' />
          </Box>
        </Box>
        {activeStep === StepState.SELECT_MATERIAL && <Step1 />}
        {activeStep === StepState.TRANSFER_PLAN && <Step2 />}
      </Box>
    </Stack>
  )
}

export default PageCreateForm
