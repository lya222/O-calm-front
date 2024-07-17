import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box sx={{ display: 'flex', mb: 100, height: 100 }}>
      loading
      <CircularProgress />
    </Box>
  );
}

export default Loading;
