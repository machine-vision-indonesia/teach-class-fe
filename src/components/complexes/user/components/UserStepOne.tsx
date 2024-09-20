import { Select } from "@/components/atoms";
import { Input } from "@/components/atoms/input";
import { Field } from "@/components/molecules/field";
import { Controller } from "react-hook-form";
import { UserStepOneProps } from "../types/ManageUserPage.types";

export const UserStepOne: React.FC<UserStepOneProps> = ({
  form,
  roleOptions,
  workCenters,
  departmentOptions,
  jobFunctionOptions,
  watchDepartment,
  watchJobFunction,
  pages = "add"
}) => {
  console.log(form && form?.watch())
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        rowGap: '12px',
        columnGap: '20px',
        marginTop: '20px',
      }}
    >
      <div style={{ gridColumn: 'span 6' }}>
        <Field name='email' size="large" isRequired>
          <Field.Label>Email</Field.Label>
          <Field.SelectController controller={form.control} errors={form.formState.errors} >
            <Input type="text" fullWidth variant="outlined" />
          </Field.SelectController>
        </Field>
      </div>

      {pages === "add" && (
        <>
          <div style={{ gridColumn: 'span 3' }}>
            <Field name='password' size="large" isRequired>
              <Field.Label>Password</Field.Label>
              <Field.SelectController controller={form.control} errors={form.formState.errors} >
                <Input placeholder="" type="password" fullWidth variant="outlined" />
              </Field.SelectController>
            </Field>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <Field name='confirm_password' size="large" isRequired>
              <Field.Label>Confirm Password</Field.Label>
              <Field.SelectController controller={form.control} errors={form.formState.errors} >
                <Input placeholder="" type="password" fullWidth variant="outlined" />
              </Field.SelectController>
            </Field>
          </div>
        </>
      )}

      <div style={{ gridColumn: 'span 3' }}>
        <Field name='roles' label="Roles" isRequired>
          <Field.SelectController controller={form.control} errors={form.formState.errors}>
            <Select
              data={roleOptions}
              labelKey="label"
              valueKey="id"
              size="medium"
              placeholder="--Select Roles--"
              // selected={rest.value}
              variant="multiple"
            // onChange={(value) => onChange(value)}
            />
          </Field.SelectController>
        </Field>
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Field size="large" name='work_center' label="Work Center" isRequired>
          <Field.SelectController controller={form.control} errors={form.formState.errors}>
            <Select
              data={workCenters.data ?? []}
              labelKey="label"
              valueKey="id"
              placeholder="--Select Work Center--"
              // selected={value}
              variant="default"
            />
          </Field.SelectController>
        </Field>
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Field size="large" name='department' label="Department" isRequired>
          <Field.SelectController controller={form.control} errors={form.formState.errors}>
            <Select
              data={departmentOptions}
              labelKey="label"
              valueKey="id"
              placeholder="--Select Department--"
              variant="default"
            />
          </Field.SelectController>
        </Field>
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Field size="large" name='job_function' label="Job Function" isRequired>
          <Field.SelectController controller={form.control} errors={form.formState.errors}>
            <Select
              data={jobFunctionOptions}
              labelKey="label"
              valueKey="id"
              placeholder="--Select Job Function--"
              variant="default"
            />
          </Field.SelectController>
        </Field>
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Controller
          name="job_level"
          control={form.control}
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Job Level"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors[rest.name]?.message}
              {...rest}
            >
              <Input
                fullWidth
                type="text"
                id="job_level"
                variant="outlined"
                sx={{ marginTop: '4px' }}
                disabled={!watchDepartment || !watchJobFunction}
                inputRef={ref}
                {...rest}
              />
            </Field>
          )}
        />
      </div>

      <div style={{ gridColumn: 'span 3' }}>
        <Controller
          name="job_title"
          control={form.control}
          render={({ field: { ref, ...rest }, fieldState }) => (
            <Field
              size="medium"
              weight="bolder"
              sx={{ my: 2 }}
              fullWidth
              label="Job Title"
              isRequired
              error={fieldState.invalid}
              helperText={form.formState.errors[rest.name]?.message}
              {...rest}
            >
              <Input
                fullWidth
                type="text"
                id="job_title"
                variant="outlined"
                sx={{ marginTop: '4px' }}
                disabled={!watchDepartment || !watchJobFunction}
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
