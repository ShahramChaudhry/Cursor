# سبLess — Because Less is More

A modern, accessible, UAE-localized subscription tracking app that helps users automatically detect, track, and manage recurring payments and free trials — reducing wasted money and giving full spending visibility.

## 🌟 Features

### Core Features
- **Auto-detect subscriptions** via email parsing and bank linking
- **Smart reminders** for upcoming payments and trial expirations
- **One-click cancellation** through integrations
- **Total-spend analytics** with monthly breakdowns and category views
- **Usage-based suggestions** to optimize spending

### Advanced Features
- **Pause/cancel/renew** directly through integrations (Stripe, PayPal, etc.)
- **Shared household view** for family/friend subscription management
- **UAE localization** with AED currency, Arabic/English UI, and local payment systems
- **Privacy-first design** with transparent permissions and data security
- **Accessibility support** with screen-reader compatibility and clear typography

## 🚀 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Email parsing** with Nodemailer and Cheerio
- **Open Banking API** integration
- **Stripe & PayPal** payment integrations

### Frontend
- **React** with TypeScript
- **Material-UI** for modern, accessible components
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **i18next** for Arabic/English localization
- **Recharts** for analytics visualization

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sabless
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment setup**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your configuration
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `config.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sabless

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Providers
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Open Banking API
OPEN_BANKING_API_KEY=your_open_banking_api_key
OPEN_BANKING_BASE_URL=https://api.openbanking.ae

# Frontend URL
CLIENT_URL=http://localhost:3000
```

## 🏗️ Project Structure

```
sabless/
├── server/                 # Backend Node.js application
│   ├── config/            # Database and app configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Server entry point
├── client/               # Frontend React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # React contexts
│   │   ├── locales/     # i18n translation files
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main app component
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🌍 Localization

The app supports both Arabic and English languages with RTL (Right-to-Left) support for Arabic. Language switching is available in the navigation bar.

### Adding New Translations

1. Add new keys to `client/src/locales/en.json`
2. Add corresponding Arabic translations to `client/src/locales/ar.json`
3. Use the `useTranslation` hook in components:

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('app.title')}</h1>;
};
```

## 🔐 Authentication

The app uses JWT-based authentication with the following features:
- User registration and login
- Password reset functionality
- Protected routes
- Role-based access control
- Secure cookie handling

## 📊 Database Models

### User
- Profile information and preferences
- Subscription plan details
- Bank and email account connections
- Authentication data

### Subscription
- Subscription details (name, provider, amount, billing cycle)
- Payment method and provider information
- Usage tracking and analytics
- Cancellation and renewal management

### Transaction
- Payment history
- Bank transaction linking
- Email receipt parsing
- Confidence scoring

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🎯 Roadmap

- [ ] Email parsing service implementation
- [ ] Bank API integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] B2B API and dashboard
- [ ] Machine learning for spending insights
- [ ] Integration with more UAE payment providers

---

**سبLess** — Because Less is More 🪶
