import React from 'react';
import { Controller } from 'react-hook-form';
import { Select } from '@/components/atoms';
import { Input } from '@/components/atoms/input';
import { Field } from '@/components/molecules/field';
import { AddUserStepTwoProps } from '../types/ManageUserPage.types';

export const UserStepTwo: React.FC<AddUserStepTwoProps> = ({
  form,
  genders,
  religions,
  pages = "add"

}) => {
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
          name="id_number"
          defaultValue=""
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="ID Number"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.id_number?.message}
              {...rest}
            >
              <Input
                fullWidth
                type="text"
                id="id_number"
                variant="outlined"
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
          name="first_name"
          defaultValue=""
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="First Name"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.first_name?.message}
              {...rest}
            >
              <Input
                fullWidth
                type="text"
                id="first_name"
                variant="outlined"
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
          name="last_name"
          defaultValue=""
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Last Name"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.last_name?.message}
              {...rest}
            >
              <Input
                fullWidth
                type="text"
                id="last_name"
                variant="outlined"
                color={fieldState.invalid ? 'error' : 'primary'}
                inputRef={ref}
                {...rest}
              />
            </Field>
          )}
        />
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Field size="large" name='gender' label="Gender" isRequired>
          <Field.SelectController controller={form.control} errors={form.formState.errors}>
            <Select
              data={genders}
              labelKey="label"
              valueKey="id"
              placeholder="--Select genders--"
              variant="default"
            />
          </Field.SelectController>
        </Field>
        {/* <Controller
          control={form.control}
          name="gender"
          render={({ field: { value, onChange, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Gender"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.gender?.message}
              {...rest}
            >
              <Select
                data={genders}
                labelKey="label"
                valueKey="id"
                placeholder="--Select Gender--"
                selected={value}
                variant="default"
                onChange={(value) => onChange(value)}
              />
            </Field>
          )}
        /> */}
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Controller
          control={form.control}
          name="religion"
          render={({ field: { value, onChange, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Religion"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors.religion?.message}
              {...rest}
            >
              <Select
                data={religions}
                labelKey="label"
                valueKey="id"
                placeholder="--Select Religion--"
                selected={value}
                variant="default"
                onChange={(value) => onChange(value)}
              />
            </Field>
          )}
        />
      </div>
      {pages === 'edit' && (
        <div style={{ gridColumn: 'span 6' }}>
          <Controller
            name="email"
            control={form.control}
            defaultValue=""
            render={({
              field: { name, ...rest },
              fieldState,
            }) => (
              <Field
                size="medium"
                iconStartAdornment='codicon:mail'
                weight="bolder"
                sx={{ my: 2 }}
                placeholder=""
                fullWidth
                label="Email"
                isRequired
                error={fieldState.invalid}
                helperText={form.formState.errors[name]?.message}
                {...rest}
              >
                <Input type="text" variant="outlined" />
              </Field>
            )}
          />
        </div>
      )}

    </div>
  );
};
