import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Language,
  Login,
  PersonAdd
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const LandingNavbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
    handleClose();
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}
        >
          {t('app.title')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            size="large"
            aria-label="change language"
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ color: 'text.primary' }}
          >
            <Language />
          </IconButton>
          
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLanguageChange}>
              <ListItemIcon>
                <Language fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {language === 'en' ? 'العربية' : 'English'}
              </ListItemText>
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            onClick={() => navigate('/login')}
            startIcon={<Login />}
            sx={{ color: 'text.primary' }}
          >
            {t('auth.login')}
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            startIcon={<PersonAdd />}
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            {t('auth.register')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavbar;
