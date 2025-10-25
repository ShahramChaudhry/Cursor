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
  Paper
} from '@mui/material';
import {
  Add,
  TrendingUp,
  Payment,
  Schedule,
  AttachMoney,
  TrendingDown
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface DashboardStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyCost: number;
  upcomingPayments: number;
}

interface RecentSubscription {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  nextBillingDate: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlyCost: 0,
    upcomingPayments: 0
  });
  const [recentSubscriptions, setRecentSubscriptions] = useState<RecentSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [subscriptionsResponse, analyticsResponse] = await Promise.all([
        axios.get('/subscriptions?limit=5'),
        axios.get('/subscriptions/analytics')
      ]);

      setRecentSubscriptions(subscriptionsResponse.data.data);
      
      const analytics = analyticsResponse.data.data;
      setStats({
        totalSubscriptions: analytics.totalSubscriptions,
        activeSubscriptions: analytics.activeSubscriptions,
        monthlyCost: analytics.totalMonthlyCost,
        upcomingPayments: subscriptionsResponse.data.data.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.welcome')}, {localStorage.getItem('userName') || 'User'}!
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
                    {stats.totalSubscriptions}
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
                    {formatCurrency(stats.monthlyCost)}
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
                    {stats.upcomingPayments}
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
                    {stats.activeSubscriptions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.quickActions')}
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/subscriptions')}
                >
                  {t('dashboard.addSubscription')}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingUp />}
                  onClick={() => navigate('/analytics')}
                >
                  {t('dashboard.viewAnalytics')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.recentActivity')}
              </Typography>
              <List>
                {recentSubscriptions.map((subscription, index) => (
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
                    {index < recentSubscriptions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
