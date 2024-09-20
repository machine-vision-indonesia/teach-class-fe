import { Box, Checkbox, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';

const EmptyStateTable = () => {
  const theme = useTheme()
  return (
    <Box sx={{ width: '30%', maxWidth: '400px', overflow: 'hidden', borderRadius: '8px', backgroundColor: theme.colorToken.background.neutral.subtlest, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.colorToken.background.neutral.disabled }}>
            <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}>
              <Checkbox disabled />
            </TableCell>
            <TableCell sx={{ borderBottom: 'none', width: '200px' }}>
              <Skeleton variant="rounded" width="100%" height={20} animation={false} />
            </TableCell>
            <TableCell sx={{ borderBottom: 'none', width: '155px' }}>
              <Skeleton variant="rounded" width="100%" height={20} animation={false} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(2)].map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}>
                <Checkbox disabled />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Skeleton variant="rounded" width="100%" height={20} animation={false} />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Skeleton variant="rounded" width="100%" height={20} animation={false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EmptyStateTable;
