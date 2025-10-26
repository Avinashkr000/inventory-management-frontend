import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography color="text.secondary">
      This page is scaffolded and ready to connect to backend APIs. Replace this with real content.
    </Typography>
  </Paper>
);

export default Placeholder;
