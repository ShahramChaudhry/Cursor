import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import {
  Check,
  Close,
  Star,
  Security,
  Analytics,
  Support,
  CloudSync,
  Speed,
  Group
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SubscriptionModel: React.FC = () => {
  const { t } = useTranslation();

  const freeFeatures = [
    'Track up to 5 subscriptions',
    'Basic spending analytics',
    'Email notifications',
    'Manual subscription entry',
    'Basic cancellation reminders',
    'Monthly spending overview'
  ];

  const proFeatures = [
    'Unlimited subscriptions',
    'Advanced analytics & insights',
    'Bank account integration',
    'Automatic subscription detection',
    'Smart spending recommendations',
    'Household account sharing',
    'Priority customer support',
    'Export data to CSV/PDF',
    'Custom categories & tags',
    'Spending alerts & budgets',
    'One-click cancellation',
    'Trial tracking & alerts'
  ];

  return (
    <Box sx={{ 
      backgroundColor: '#0F172A', 
      minHeight: '100vh', 
      color: 'white',
      px: { xs: 2, md: 8 },
      py: 4
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Choose Your Plan
        </Typography>
        <Typography variant="h6" sx={{ color: '#94A3B8', maxWidth: 600, mx: 'auto' }}>
          Start free and upgrade when you need more features. Cancel anytime.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Free Plan */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ 
            backgroundColor: '#1E293B', 
            border: '1px solid #334155',
            borderRadius: 3,
            height: '100%',
            position: 'relative'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Free
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#10B981', mb: 1 }}>
                  AED 0
                </Typography>
                <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                  Perfect for getting started
                </Typography>
              </Box>

              <List sx={{ mb: 4 }}>
                {freeFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check sx={{ color: '#10B981' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      primaryTypographyProps={{ color: 'white' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#334155',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)'
                  }
                }}
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pro Plan */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ 
            backgroundColor: '#1E293B', 
            border: '2px solid #3B82F6',
            borderRadius: 3,
            height: '100%',
            position: 'relative'
          }}>
            {/* Popular Badge */}
            <Chip
              label="Most Popular"
              color="primary"
              sx={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1
              }}
            />
            
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Pro
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#3B82F6', mb: 1 }}>
                  AED 25
                </Typography>
                <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                  per month • Save AED 300/year
                </Typography>
              </Box>

              <List sx={{ mb: 4 }}>
                {proFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check sx={{ color: '#3B82F6' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      primaryTypographyProps={{ color: 'white' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#3B82F6',
                  '&:hover': { backgroundColor: '#2563EB' }
                }}
              >
                Start Pro Trial
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Feature Comparison */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Feature Comparison
        </Typography>
        
        <Card sx={{ 
          backgroundColor: '#1E293B', 
          border: '1px solid #334155',
          borderRadius: 3
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={6}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Features
                  </Typography>
                </Grid>
                <Grid size={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Free
                  </Typography>
                </Grid>
                <Grid size={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Pro
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {[
              { feature: 'Subscription Tracking', free: true, pro: true },
              { feature: 'Spending Analytics', free: 'Basic', pro: 'Advanced' },
              { feature: 'Bank Integration', free: false, pro: true },
              { feature: 'Auto Detection', free: false, pro: true },
              { feature: 'Household Sharing', free: false, pro: true },
              { feature: 'Priority Support', free: false, pro: true },
              { feature: 'Data Export', free: false, pro: true },
              { feature: 'Custom Categories', free: false, pro: true }
            ].map((item, index) => (
              <Box key={index} sx={{ p: 3, borderBottom: index < 7 ? '1px solid #334155' : 'none' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={6}>
                    <Typography variant="body1">
                      {item.feature}
                    </Typography>
                  </Grid>
                  <Grid size={3} sx={{ textAlign: 'center' }}>
                    {item.free === true ? (
                      <Check sx={{ color: '#10B981' }} />
                    ) : item.free === false ? (
                      <Close sx={{ color: '#EF4444' }} />
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        {item.free}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={3} sx={{ textAlign: 'center' }}>
                    {item.pro === true ? (
                      <Check sx={{ color: '#3B82F6' }} />
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        {item.pro}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid #334155',
              borderRadius: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Can I cancel anytime?
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid #334155',
              borderRadius: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Is my data secure?
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Absolutely. We use bank-level encryption and never store your banking credentials. Your data is always encrypted and secure.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid #334155',
              borderRadius: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Do you offer refunds?
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid #334155',
              borderRadius: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Can I share with family?
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  Yes! Pro users can create household accounts and share subscription management with family members.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SubscriptionModel;
