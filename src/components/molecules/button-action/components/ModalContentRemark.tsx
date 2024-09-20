import { MvTypography } from "@/components/atoms/mv-typography";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { RenderContentProps } from "../types/modalContentRemark.types";

export const ModalContentRemark = (renderContent: RenderContentProps) => (
  <>
    <Controller
      name='remark'
      control={renderContent.formControl.control}
      defaultValue=''
      render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => (
        <>
          <MvTypography size='TITLE_XS' typeSize='PX' style={{ marginBottom: '4px' }}>
            Remark
          </MvTypography>
          <TextField
            {...field}
            placeholder='Input Remark'
            fullWidth
            multiline
            rows={4}
            variant='outlined'
            error={!!renderContent.formControl.formState.errors.remark}
            helperText={renderContent.formControl.formState.errors.remark?.message}
            sx={{
              '& .MuiInputBase-root': {
                p: '9px 14px'
              },
              '& .MuiFormHelperText-root': {
                mx: 0
              }
            }}
          />
        </>
      )}
    />
  </>
)
