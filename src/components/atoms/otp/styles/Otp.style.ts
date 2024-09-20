import { styled } from '@mui/material';

export const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.colorToken.text.neutralInverted};
  background: ${theme.colorToken.background.default};
  border: 1px solid ${theme.colorToken.border.neutral.boldest};
  box-shadow: '0px 2px 4px rgba(0,0,0, 0.05)'
  &:hover {
    border-color: ${theme.colorToken.border.primary.normal};
  }
  &:focus {
    border-color: ${theme.colorToken.border.primary.normal};
    box-shadow: 0 0 0 3px ${theme.colorToken.border.primary.boldest};
  }
  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
