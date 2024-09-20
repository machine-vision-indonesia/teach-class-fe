import React from 'react';
import { Controller } from 'react-hook-form';
import { Field } from '@/components/molecules/field';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';

export const UserStepThree = ({ form }: { form: any }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        rowGap: '12px',
        columnGap: '20px',
        marginTop: '20px'
      }}
    >
      <div style={{ gridColumn: 'span 6' }}>
        <Controller
          control={form.control}
          name='address'
          defaultValue=''
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Address"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.address?.message}
              {...rest}
            >
              <Textarea
                id='address'
                fullWidth
                inputRef={ref}
                color={fieldState.invalid ? 'error' : 'primary'}
                {...rest}
              />
            </Field>
          )}
        />
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Controller
          control={form.control}
          name='phone'
          defaultValue=''
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Phone"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.phone?.message}
              {...rest}
            >
              <Input
                fullWidth
                type='number'
                id='phone'
                variant='outlined'
                color={fieldState.invalid ? 'error' : 'primary'}
                inputRef={ref}
                {...rest}
              />
            </Field>
          )}
        />
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Controller
          control={form.control}
          name='post_code'
          defaultValue=''
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Postal Code"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.post_code?.message}
              {...rest}
            >
              <Input
                fullWidth
                type='text'
                id='post_code'
                variant='outlined'
                color={fieldState.invalid ? 'error' : 'primary'}
                inputRef={ref}
                {...rest}
              />
            </Field>
          )}
        />
      </div>
    </div>
  );
};
