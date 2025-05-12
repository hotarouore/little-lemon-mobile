# Little Lemon Mobile App

A modern React Native mobile application for Little Lemon restaurant, providing a complete dining experience with menu browsing, table reservations, and online ordering functionality.

<img src="./assets/images/icon.png" alt="Little Lemon Logo" width="100" height="100" />

## Features

- 🏠 **Clean Navigation Structure**
  - Five main tabs: Home, Menu, Reservations, Order, Profile
  - iOS-optimized UI with proper notch handling
  - Seamless user experience across all screens

- 🍽️ **Menu Browsing**
  - Browse through different food categories
  - Search functionality
  - Detailed item descriptions and prices
  - Add items to cart

- 🛒 **Shopping Cart & Ordering**
  - Add/remove items
  - Adjust quantities
  - View total price
  - Complete checkout process

- 📅 **Reservation System**
  - Create new table reservations
  - View all existing reservations
  - Cancel reservations when needed
  - Manage booking details
  - Data persistence with AsyncStorage

- 👤 **User Profile Management**
  - Store and retrieve user information
  - Complete onboarding process
  - Personalized experience

## Screenshots

*Insert screenshots of your app here*

## Tech Stack

- **React Native** - Core framework for building the mobile application
- **Expo** (SDK 53) - Development platform for simplified app building and deployment
- **TypeScript** - Static typing for improved code quality
- **React Navigation** (v7) - Navigation management 
- **AsyncStorage** - Local data persistence
- **Expo Router** - File-based routing system
- **React Native Safe Area Context** - Proper handling of iOS notch and safe areas
- **Reanimated** - Advanced animations
- **Expo Vector Icons** - Icon library integration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/little-lemon-mobile.git
cd little-lemon-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
little-lemon-mobile/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── (auth)/            # Authentication screens
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── context/               # Context providers for state management
│   ├── CartContext.tsx    # Shopping cart management
│   └── UserContext.tsx    # User profile management
├── utils/                 # Utility functions
│   └── uuid.ts            # UUID generation for unique IDs
├── assets/                # Images and other static assets
└── constants/             # App constants and theme
```

## Key Implementations

### Reservation System
The app implements a complete reservation system allowing users to book tables, view their reservations, and cancel them when needed. All reservation data is persisted using AsyncStorage.

### Navigation Structure
The app uses a tab-based navigation structure with five main tabs (Home, Menu, Reservations, Order, Profile) and properly handles both iOS and Android navigation patterns.

### User Management
User profiles are managed through a dedicated context provider, allowing for a personalized experience throughout the app.

### iOS Notch Handling
The app properly handles the iOS notch and safe areas using React Native Safe Area Context, ensuring a consistent experience across devices.

## How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Little Lemon Restaurant for the concept
- Expo team for the amazing framework
- React Native community for the support
