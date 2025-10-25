import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Chip
} from '@mui/material';
import {
  Notifications,
  Settings,
  Language,
  AccountCircle,
  Logout
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#1E293B',
        borderBottom: '1px solid #334155',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            سبLess
          </Typography>
          <Typography variant="body2" sx={{ 
            ml: 1, 
            color: '#94A3B8',
            display: { xs: 'none', sm: 'block' },
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }}>
            Because Less is More
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button 
            color="inherit" 
            sx={{ 
              color: 'white',
              fontWeight: 'medium',
              textDecoration: 'underline',
              textUnderlineOffset: 4
            }}
          >
            Overview
          </Button>
          <Button color="inherit" sx={{ color: '#94A3B8' }}>
            Subscriptions
          </Button>
          <Button color="inherit" sx={{ color: '#94A3B8' }}>
            Analytics
          </Button>
          <Button color="inherit" sx={{ color: '#94A3B8' }}>
            Household
          </Button>
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
          <IconButton color="inherit" sx={{ 
            color: '#94A3B8',
            padding: { xs: '4px', md: '8px' }
          }}>
            <Notifications sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
          </IconButton>
          <IconButton color="inherit" sx={{ 
            color: '#94A3B8',
            padding: { xs: '4px', md: '8px' }
          }}>
            <Settings sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
          </IconButton>
          
          {/* Language Toggle */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, md: 1 },
            ml: { xs: 0.5, md: 1 }
          }}>
            <Language sx={{ 
              color: '#94A3B8', 
              fontSize: { xs: '1rem', md: '1.25rem' },
              display: { xs: 'none', sm: 'block' }
            }} />
            <Chip
              label={language === 'ar' ? 'AR' : 'EN'}
              size="small"
              onClick={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}
              sx={{
                backgroundColor: '#334155',
                color: 'white',
                fontSize: { xs: '0.625rem', md: '0.75rem' },
                height: { xs: 24, md: 28 },
                '&:hover': {
                  backgroundColor: '#475569'
                }
              }}
            />
          </Box>

          {/* User Menu */}
          <IconButton
            onClick={handleMenuOpen}
            sx={{ 
              color: '#94A3B8',
              padding: { xs: '4px', md: '8px' }
            }}
          >
            <AccountCircle sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                color: 'white'
              }
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;