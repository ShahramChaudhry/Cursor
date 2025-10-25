import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Analytics: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('analytics.title')}
      </Typography>
      <Typography variant="body1">
        Analytics dashboard - Coming soon!
      </Typography>
    </Box>
  );
};

export default Analytics;
