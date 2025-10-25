import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add,
  CalendarToday,
  BarChart,
  Warning,
  Cancel,
  Delete,
  Edit
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    amount: '',
    category: '',
    provider: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subscriptionsRes, analyticsRes] = await Promise.all([
        fetch('/api/subscriptions'),
        fetch('/api/analytics')
      ]);
      
      const subscriptionsData = await subscriptionsRes.json();
      const analyticsData = await analyticsRes.json();
      
      setSubscriptions(subscriptionsData.data || []);
      setAnalytics(analyticsData.data || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = () => {
    const newSub = {
      id: Date.now().toString(),
      name: newSubscription.name,
      amount: parseInt(newSubscription.amount),
      currency: 'AED',
      category: newSubscription.category,
      provider: newSubscription.provider,
      status: 'active',
      icon: newSubscription.name.charAt(0).toUpperCase(),
      iconColor: '#6366F1',
      nextBillingDate: '2024-12-01'
    };
    
    setSubscriptions([...subscriptions, newSub]);
    setAddDialogOpen(false);
    setNewSubscription({ name: '', amount: '', category: '', provider: '' });
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, status: 'cancelled' } : sub
    ));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: '#0F172A', 
      minHeight: '100vh', 
      color: 'white',
      px: { xs: 2, sm: 4, md: 6, lg: 8 },
      py: { xs: 2, md: 3 }
    }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          mb: 0.5,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }
        }}>
          سبLess Dashboard
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#94A3B8',
          fontSize: { xs: '0.75rem', md: '0.875rem' }
        }}>
          Manage your subscriptions and save money
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ 
            backgroundColor: '#1E293B', 
            border: '1px solid #334155',
            borderRadius: 2
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    backgroundColor: '#3B82F6', 
                    mr: 2,
                    width: 32,
                    height: 32
                  }}>
                    $
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }}>
                      AED {analytics?.totalMonthlyCost || 411}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#94A3B8',
                      fontSize: '0.75rem'
                    }}>
                      Monthly spending
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ 
                  color: '#94A3B8',
                  fontSize: '0.625rem'
                }}>
                  This Month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ 
            backgroundColor: '#1E293B', 
            border: '1px solid #334155',
            borderRadius: 2
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    backgroundColor: '#8B5CF6', 
                    mr: 2,
                    width: 32,
                    height: 32
                  }}>
                    📈
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }}>
                      AED {analytics?.totalYearlyCost || 4932}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#94A3B8',
                      fontSize: '0.75rem'
                    }}>
                      Yearly spending
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ 
                  color: '#94A3B8',
                  fontSize: '0.625rem'
                }}>
                  Projected
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ 
            backgroundColor: '#1E293B', 
            border: '1px solid #334155',
            borderRadius: 2
          }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    backgroundColor: '#10B981', 
                    mr: 2,
                    width: 32,
                    height: 32
                  }}>
                    📅
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }}>
                      {analytics?.activeSubscriptions || 5}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#94A3B8',
                      fontSize: '0.75rem'
                    }}>
                      Subscriptions
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ 
                  color: '#94A3B8',
                  fontSize: '0.625rem'
                }}>
                  Active
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Subscriptions */}
      <Card sx={{ 
        backgroundColor: '#1E293B', 
        border: '1px solid #334155',
        borderRadius: 2,
        mb: 3
      }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              Active Subscriptions
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddDialogOpen(true)}
              sx={{ 
                backgroundColor: '#3B82F6',
                '&:hover': { backgroundColor: '#2563EB' },
                fontSize: '0.875rem',
                px: 2,
                py: 0.5,
                minWidth: 'auto'
              }}
            >
              + Add New
            </Button>
          </Box>

          {subscriptions.map((subscription) => (
            <Box
              key={subscription.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                borderBottom: '1px solid #334155',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Avatar sx={{ 
                backgroundColor: subscription.iconColor, 
                mr: 2,
                width: 32,
                height: 32,
                fontSize: '0.875rem'
              }}>
                {subscription.icon}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ 
                  fontWeight: 'medium',
                  fontSize: '0.875rem'
                }}>
                  {subscription.name}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#94A3B8', 
                  textTransform: 'capitalize',
                  fontSize: '0.75rem'
                }}>
                  {subscription.category}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography variant="body1" sx={{ 
                  fontWeight: 'medium',
                  fontSize: '0.875rem'
                }}>
                  AED {subscription.amount}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#94A3B8',
                  fontSize: '0.75rem'
                }}>
                  monthly
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleCancelSubscription(subscription.id)}
                  sx={{ 
                    color: '#EF4444',
                    width: 28,
                    height: 28,
                    padding: 0.5
                  }}
                >
                  <Cancel sx={{ fontSize: '0.875rem' }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteSubscription(subscription.id)}
                  sx={{ 
                    color: '#94A3B8',
                    width: 28,
                    height: 28,
                    padding: 0.5
                  }}
                >
                  <Delete sx={{ fontSize: '0.875rem' }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card sx={{ 
        backgroundColor: '#1E293B', 
        border: '1px solid #334155',
        borderRadius: 2,
        mb: 4
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Upcoming Payments
            </Typography>
          </Box>

          {analytics?.upcomingPayments?.map((payment: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                borderBottom: index < analytics.upcomingPayments.length - 1 ? '1px solid #334155' : 'none'
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {payment.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  {payment.date}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                AED {payment.amount}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* By Category */}
      <Card sx={{ 
        backgroundColor: '#1E293B', 
        border: '1px solid #334155',
        borderRadius: 2,
        mb: 4
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BarChart sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              By Category
            </Typography>
          </Box>

          {Object.entries(analytics?.categoryBreakdown || {}).map(([category, data]: [string, any]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  AED {data.amount}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(data.amount / analytics.totalMonthlyCost) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#334155',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: category === 'utilities' ? '#3B82F6' : 
                                   category === 'entertainment' ? '#8B5CF6' :
                                   category === 'music' ? '#10B981' : '#F59E0B'
                  }
                }}
              />
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Trial Ending Soon */}
      {subscriptions.some(sub => sub.status === 'trial') && (
        <Card sx={{ 
          backgroundColor: '#1E293B', 
          border: '1px solid #334155',
          borderRadius: 2
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Warning sx={{ mr: 1, fontSize: 20, color: '#F59E0B' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Trial Ending Soon
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              YouTube Premium trial ends in 3 days
            </Typography>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: '#F59E0B',
                '&:hover': { backgroundColor: '#D97706' }
              }}
            >
              Cancel Before Charge
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Subscription Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Subscription</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Service Name"
            value={newSubscription.name}
            onChange={(e) => setNewSubscription({...newSubscription, name: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Amount (AED)"
            type="number"
            value={newSubscription.amount}
            onChange={(e) => setNewSubscription({...newSubscription, amount: e.target.value})}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newSubscription.category}
              onChange={(e) => setNewSubscription({...newSubscription, category: e.target.value})}
            >
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="software">Software</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Provider"
            value={newSubscription.provider}
            onChange={(e) => setNewSubscription({...newSubscription, provider: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubscription} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;