import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '@mui/material';

interface DefaultValue {
  id: string;
}

interface OptionDefaultValue extends DefaultValue {
  label?: string;
}

interface MultiSelectAsyncProps {
  defaultValue?: OptionDefaultValue[];
  onChange?: (selectedOptions: OptionDefaultValue[]) => void;
  fullWidth: boolean;
  dataFetchService: () => UseQueryResult<{ data: any[] }>;
  valueKey: string;
  valueLabel: string;
  placeholder?: string;
  isDisable?: boolean
  chipColor?: string
}

const MultiSelectAsync: React.FC<MultiSelectAsyncProps> = ({
  defaultValue = [],
  onChange,
  fullWidth,
  dataFetchService,
  valueKey,
  valueLabel,
  placeholder,
  isDisable = false,
  chipColor
}) => {
  const [value, setValue] = useState<DefaultValue[]>(defaultValue);
  const [newDefaultValue, setNewDefaultValue] = useState<OptionDefaultValue[]>(defaultValue);
  const query = dataFetchService();
  const theme = useTheme()

  useEffect(() => {
    if (query.isSuccess) {
      const updatedDefaultValue = defaultValue.map(item => {
        const data = query.data?.data.find(row => row[valueKey] === item.id)
        if (!data) return null;
        return {
          id: data[valueKey],
          label: data[valueLabel]
        }
      });
      setNewDefaultValue(updatedDefaultValue);
    }
  }, [defaultValue, query.data, valueKey, valueLabel]);

  const handleOnChange = (_, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const options = query?.isSuccess
    ? query.data.data.map((row) => ({
      id: row[valueKey],
      label: row[valueLabel],
    }))
    : [];

  // ERROR HANDLING
  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (query.isError) {
    return <div>Error fetching data</div>
  }

  return (
    <Autocomplete
      value={newDefaultValue}
      multiple
      onChange={handleOnChange}
      disabled={query?.isLoading || isDisable}
      size="small"
      fullWidth={fullWidth}
      options={options}
      loading={query?.isLoading}
      sx={{
        marginTop: '4px'
      }}
      autoHighlight
      renderTags={(value: OptionDefaultValue[], getTagProps: any) =>
        value.map((option: OptionDefaultValue, index: number) => (
          <Chip label={option.label} {...getTagProps({ index })} key={option.id} color={(chipColor ? chipColor : 'primary')} size="small" />
        ))
      }
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      getOptionLabel={(option) => option.label as string}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={query?.isLoading ? 'is loading...' : placeholder}
          variant="outlined"
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default MultiSelectAsync;
