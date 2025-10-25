import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import {
  Add,
  TrendingUp,
  Payment,
  Schedule,
  AttachMoney,
  TrendingDown,
  Cancel,
  Pause,
  PlayArrow,
  Close,
  Email,
  AccountBalance,
  Analytics,
  Dashboard as DashboardIcon,
  Subscriptions as SubscriptionsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

interface DemoSubscription {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  nextBillingDate: string;
  status: string;
  category: string;
}

interface DemoProps {
  open: boolean;
  onClose: () => void;
}

const DemoMode: React.FC<DemoProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Demo data
  const demoStats = {
    totalSubscriptions: 12,
    activeSubscriptions: 10,
    monthlyCost: 450,
    upcomingPayments: 3
  };

  const demoSubscriptions: DemoSubscription[] = [
    {
      id: '1',
      name: 'Netflix Premium',
      provider: 'Netflix',
      amount: 55,
      currency: 'AED',
      nextBillingDate: '2024-01-15',
      status: 'active',
      category: 'streaming'
    },
    {
      id: '2',
      name: 'Spotify Premium',
      provider: 'Spotify',
      amount: 25,
      currency: 'AED',
      nextBillingDate: '2024-01-20',
      status: 'active',
      category: 'music'
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      provider: 'Adobe',
      amount: 120,
      currency: 'AED',
      nextBillingDate: '2024-01-25',
      status: 'active',
      category: 'software'
    },
    {
      id: '4',
      name: 'Etisalat Mobile',
      provider: 'Etisalat',
      amount: 150,
      currency: 'AED',
      nextBillingDate: '2024-01-10',
      status: 'active',
      category: 'telecom'
    },
    {
      id: '5',
      name: 'Starzplay',
      provider: 'Starzplay',
      amount: 35,
      currency: 'AED',
      nextBillingDate: '2024-01-18',
      status: 'trial',
      category: 'streaming'
    }
  ];

  const demoAnalytics = {
    categoryBreakdown: {
      streaming: { count: 3, amount: 90 },
      music: { count: 1, amount: 25 },
      software: { count: 1, amount: 120 },
      telecom: { count: 1, amount: 150 }
    },
    monthlyTrend: [
      { month: 'Oct', amount: 420 },
      { month: 'Nov', amount: 450 },
      { month: 'Dec', amount: 480 },
      { month: 'Jan', amount: 450 }
    ]
  };

  const formatCurrency = (amount: number, currency: string = 'AED') => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'trial': return 'info';
      case 'paused': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const renderDashboard = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.welcome')}, Demo User!
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {t('dashboard.totalSubscriptions')}
                  </Typography>
                  <Typography variant="h4">
                    {demoStats.totalSubscriptions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AttachMoney color="success" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {t('dashboard.monthlyCost')}
                  </Typography>
                  <Typography variant="h4">
                    {formatCurrency(demoStats.monthlyCost)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Payment color="warning" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {t('dashboard.upcomingPayments')}
                  </Typography>
                  <Typography variant="h4">
                    {demoStats.upcomingPayments}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Schedule color="info" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {t('dashboard.activeSubscriptions')}
                  </Typography>
                  <Typography variant="h4">
                    {demoStats.activeSubscriptions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.recentActivity')}
              </Typography>
              <List>
                {demoSubscriptions.slice(0, 3).map((subscription, index) => (
                  <React.Fragment key={subscription.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Payment />
                      </ListItemIcon>
                      <ListItemText
                        primary={subscription.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {subscription.provider} • {formatCurrency(subscription.amount, subscription.currency)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {t('subscriptions.nextBilling')}: {formatDate(subscription.nextBillingDate)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={t(`subscriptions.${subscription.status}`)}
                        color={getStatusColor(subscription.status) as any}
                        size="small"
                      />
                    </ListItem>
                    {index < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSubscriptions = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('subscriptions.title')}
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          {t('subscriptions.addNew')}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('subscriptions.name')}</TableCell>
              <TableCell>{t('subscriptions.provider')}</TableCell>
              <TableCell>{t('subscriptions.amount')}</TableCell>
              <TableCell>{t('subscriptions.nextBilling')}</TableCell>
              <TableCell>{t('subscriptions.status')}</TableCell>
              <TableCell>{t('subscriptions.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.provider}</TableCell>
                <TableCell>{formatCurrency(subscription.amount, subscription.currency)}</TableCell>
                <TableCell>{formatDate(subscription.nextBillingDate)}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`subscriptions.${subscription.status}`)}
                    color={getStatusColor(subscription.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton size="small" color="warning">
                      <Pause />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Cancel />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('analytics.title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('analytics.categoryBreakdown')}
              </Typography>
              {Object.entries(demoAnalytics.categoryBreakdown).map(([category, data]) => (
                <Box key={category} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">
                      {t(`categories.${category}`)}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(data.amount)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(data.amount / 450) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('analytics.spendingTrend')}
              </Typography>
              <Box height={200} display="flex" alignItems="end" gap={2}>
                {demoAnalytics.monthlyTrend.map((month, index) => (
                  <Box key={month.month} textAlign="center">
                    <Box
                      height={`${(month.amount / 500) * 150}px`}
                      width={40}
                      bgcolor="primary.main"
                      borderRadius={1}
                      mb={1}
                    />
                    <Typography variant="caption">{month.month}</Typography>
                    <Typography variant="caption" display="block">
                      {formatCurrency(month.amount)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            <PlayArrow />
          </Avatar>
          <Typography variant="h5">
            {language === 'ar' ? 'عرض تجريبي لـ سبLess' : 'سبLess Demo'}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="demo tabs">
            <Tab icon={<DashboardIcon />} label={t('navigation.dashboard')} />
            <Tab icon={<SubscriptionsIcon />} label={t('navigation.subscriptions')} />
            <Tab icon={<Analytics />} label={t('navigation.analytics')} />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          
          {activeTab === 0 && renderDashboard()}
          {activeTab === 1 && renderSubscriptions()}
          {activeTab === 2 && renderAnalytics()}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Button onClick={onClose} variant="outlined">
          {t('common.close')}
        </Button>
        <Button 
          variant="contained" 
          onClick={() => {
            onClose();
            window.location.href = '/register';
          }}
          startIcon={<Add />}
        >
          {language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DemoMode;
