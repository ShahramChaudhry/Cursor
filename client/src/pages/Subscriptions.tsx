import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Subscriptions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('subscriptions.title')}
      </Typography>
      <Typography variant="body1">
        Subscription management page - Coming soon!
      </Typography>
    </Box>
  );
};

export default Subscriptions;
