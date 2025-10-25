import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PlayArrow,
  TrendingUp,
  Security,
  Language,
  AttachMoney,
  Smartphone,
  Email,
  AccountBalance,
  Analytics,
  Cancel,
  Pause,
  Refresh,
  CheckCircle,
  Star,
  ArrowForward,
  Close,
  Visibility,
  Speed,
  Support
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import DemoMode from '../components/DemoMode';
import LandingNavbar from '../components/layout/LandingNavbar';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, direction } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleTryMe = () => {
    setDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setDemoOpen(false);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStartApp = () => {
    setDemoOpen(false);
    navigate('/register');
  };

  const features = [
    {
      icon: <Email />,
      title: language === 'ar' ? 'اكتشاف تلقائي من البريد الإلكتروني' : 'Auto-Detection from Emails',
      description: language === 'ar' ? 'اكتشف الاشتراكات تلقائياً من رسائل البريد الإلكتروني للفواتير والتجديدات' : 'Automatically detect subscriptions from billing and renewal emails'
    },
    {
      icon: <AccountBalance />,
      title: language === 'ar' ? 'ربط الحسابات المصرفية' : 'Bank Account Linking',
      description: language === 'ar' ? 'راقب المعاملات المتكررة من خلال ربط حسابك المصرفي' : 'Monitor recurring transactions by linking your bank account'
    },
    {
      icon: <Analytics />,
      title: language === 'ar' ? 'تحليلات ذكية للإنفاق' : 'Smart Spending Analytics',
      description: language === 'ar' ? 'احصل على رؤى مفصلة عن أنماط الإنفاق والتوصيات' : 'Get detailed insights into spending patterns and recommendations'
    },
    {
      icon: <Cancel />,
      title: language === 'ar' ? 'إلغاء بنقرة واحدة' : 'One-Click Cancellation',
      description: language === 'ar' ? 'ألغِ أو أوقف الاشتراكات مباشرة من التطبيق' : 'Cancel or pause subscriptions directly from the app'
    }
  ];

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'مطور برمجيات' : 'Software Developer',
      avatar: 'A',
      content: language === 'ar' ? 'سبLess ساعدني في توفير 500 درهم شهرياً من خلال اكتشاف الاشتراكات المنسية!' : 'سبLess helped me save 500 AED monthly by discovering forgotten subscriptions!',
      rating: 5
    },
    {
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      role: language === 'ar' ? 'مديرة تسويق' : 'Marketing Manager',
      avatar: 'F',
      content: language === 'ar' ? 'واجهة المستخدم باللغة العربية رائعة، والتحليلات مفيدة جداً' : 'The Arabic UI is amazing, and the analytics are so helpful',
      rating: 5
    },
    {
      name: language === 'ar' ? 'محمد الخوري' : 'Mohammed Al Khouri',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
      avatar: 'M',
      content: language === 'ar' ? 'أفضل تطبيق لإدارة الاشتراكات في الإمارات' : 'The best subscription management app in the UAE',
      rating: 5
    }
  ];

  const stats = [
    { number: '2,500+', label: language === 'ar' ? 'مستخدم نشط' : 'Active Users' },
    { number: 'AED 1.2M', label: language === 'ar' ? 'تم توفيره' : 'Saved' },
    { number: '15,000+', label: language === 'ar' ? 'اشتراك تم اكتشافه' : 'Subscriptions Detected' },
    { number: '98%', label: language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate' }
  ];

  const demoSteps = [
    {
      label: language === 'ar' ? 'تسجيل الدخول' : 'Sign Up',
      content: language === 'ar' ? 'أنشئ حسابك في دقائق قليلة' : 'Create your account in minutes',
      icon: <CheckCircle />
    },
    {
      label: language === 'ar' ? 'ربط البريد الإلكتروني' : 'Connect Email',
      content: language === 'ar' ? 'اربط حساب بريدك الإلكتروني لاكتشاف الاشتراكات تلقائياً' : 'Connect your email to automatically discover subscriptions',
      icon: <Email />
    },
    {
      label: language === 'ar' ? 'ربط الحساب المصرفي' : 'Link Bank Account',
      content: language === 'ar' ? 'اربط حسابك المصرفي لمراقبة المعاملات المتكررة' : 'Link your bank account to monitor recurring transactions',
      icon: <AccountBalance />
    },
    {
      label: language === 'ar' ? 'استكشاف التحليلات' : 'Explore Analytics',
      content: language === 'ar' ? 'احصل على رؤى مفصلة عن إنفاقك وتوفير المال' : 'Get detailed insights into your spending and save money',
      icon: <Analytics />
    }
  ];

  return (
    <Box>
      {/* Navigation */}
      <LandingNavbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                {language === 'ar' ? 'سبLess' : 'سبLess'}
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 300,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  mb: 3
                }}
              >
                {language === 'ar' ? 'لأن الأقل هو الأكثر' : 'Because Less is More'}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                {language === 'ar' 
                  ? 'اكتشف، تتبع، وأدر اشتراكاتك تلقائياً. وفر المال وكن على دراية كاملة بإنفاقك في دولة الإمارات العربية المتحدة.'
                  : 'Discover, track, and manage your subscriptions automatically. Save money and gain full visibility into your spending in the UAE.'
                }
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleTryMe}
                  startIcon={<PlayArrow />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#667eea',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  {language === 'ar' ? 'جرب الآن' : 'Try Me'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {language === 'ar' ? 'ابدأ مجاناً' : 'Start Free'}
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                  position: 'relative'
                }}
              >
                <Card
                  sx={{
                    maxWidth: 300,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {language === 'ar' ? 'الاشتراكات النشطة' : 'Active Subscriptions'}
                      </Typography>
                      <Typography variant="h6" color="success.main">
                        12
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {language === 'ar' ? 'التكلفة الشهرية' : 'Monthly Cost'}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        AED 450
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        {language === 'ar' ? 'المدخرات الشهرية' : 'Monthly Savings'}
                      </Typography>
                      <Typography variant="h6" color="success.main">
                        AED 200
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box textAlign="center">
                  <Typography variant="h3" component="div" color="primary" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Problem Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" gutterBottom>
                {language === 'ar' ? 'المشكلة التي نحلها' : 'The Problem We Solve'}
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                {language === 'ar' 
                  ? 'هل تعلم أن المستهلكين في الإمارات ينفقون في المتوسط 800 درهم شهرياً على الاشتراكات المنسية؟'
                  : 'Did you know that consumers in the UAE spend an average of 800 AED monthly on forgotten subscriptions?'
                }
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={language === 'ar' ? 'اشتراكات منسية تستهلك ميزانيتك' : 'Forgotten subscriptions draining your budget'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Visibility color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary={language === 'ar' ? 'عدم وضوح في أنماط الإنفاق' : 'Lack of visibility into spending patterns'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cancel color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={language === 'ar' ? 'صعوبة في إدارة الاشتراكات المتعددة' : 'Difficulty managing multiple subscriptions'}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '400px', backgroundColor: '#ffebee' }}>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h4" color="error" gutterBottom textAlign="center">
                    {language === 'ar' ? '800 درهم' : '800 AED'}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" textAlign="center">
                    {language === 'ar' ? 'متوسط الإنفاق الشهري على الاشتراكات المنسية' : 'Average monthly spending on forgotten subscriptions'}
                  </Typography>
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Chip
                      label={language === 'ar' ? 'في دولة الإمارات' : 'In the UAE'}
                      color="error"
                      variant="outlined"
                      size="medium"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Solution Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" gutterBottom>
              {language === 'ar' ? 'حلنا الذكي' : 'Our Smart Solution'}
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
              {language === 'ar' 
                ? 'سبLess يستخدم الذكاء الاصطناعي لاكتشاف وإدارة الاشتراكات تلقائياً'
                : 'سبLess uses AI to automatically discover and manage subscriptions'
              }
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" gutterBottom>
              {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} color="warning" fontSize="small" />
                    ))}
                  </Box>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h3" gutterBottom>
              {language === 'ar' ? 'ابدأ توفير المال اليوم' : 'Start Saving Money Today'}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {language === 'ar' 
                ? 'انضم إلى آلاف المستخدمين الذين وفرت لهم سبLess آلاف الدراهم'
                : 'Join thousands of users who have saved thousands of dirhams with سبLess'
              }
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleTryMe}
                startIcon={<PlayArrow />}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {language === 'ar' ? 'جرب الآن' : 'Try Me'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                {language === 'ar' ? 'ابدأ مجاناً' : 'Start Free'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Demo Dialog */}
      <Dialog
        open={demoOpen}
        onClose={handleCloseDemo}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            {language === 'ar' ? 'جرب سبLess' : 'Try سبLess'}
          </Typography>
          <IconButton onClick={handleCloseDemo}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {demoSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Avatar sx={{ backgroundColor: activeStep >= index ? 'primary.main' : 'grey.300' }}>
                      {step.icon}
                    </Avatar>
                  )}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" paragraph>
                    {step.content}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={index === demoSteps.length - 1 ? handleStartApp : handleNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === demoSteps.length - 1 
                        ? (language === 'ar' ? 'ابدأ الآن' : 'Start Now')
                        : (language === 'ar' ? 'التالي' : 'Next')
                      }
                    </Button>
                    {index > 0 && (
                      <Button onClick={handlePrevStep} sx={{ mt: 1, mr: 1 }}>
                        {language === 'ar' ? 'السابق' : 'Back'}
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>

      {/* Demo Mode Component */}
      <DemoMode open={demoOpen} onClose={handleCloseDemo} />
    </Box>
  );
};

export default LandingPage;
