# Little Lemon Mobile App

A modern mobile application for the Little Lemon restaurant, built with React Native and Expo. This app provides a seamless dining experience with features like menu browsing, table reservations, and online ordering.

## Features

- 🍽️ **Menu Browsing**
  - Browse through different categories (starters, mains, desserts, drinks)
  - Search functionality
  - Detailed item descriptions and prices
  - Add items to cart

- 🛒 **Shopping Cart**
  - Add/remove items
  - Adjust quantities
  - View total price
  - Checkout process

- 📅 **Table Reservations**
  - Date and time selection
  - Guest count
  - Special occasion booking
  - Reservation management

- 🏠 **Home Screen**
  - Featured specials
  - Quick access to menu
  - Restaurant information
  - About section

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Context API for state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

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
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── context/              # Context providers
├── data/                 # Mock data and types
├── assets/              # Images and other static assets
└── constants/           # App constants and theme
```

## Key Components

- **CartContext**: Manages shopping cart state across the app
- **AddToCartModal**: Provides feedback when items are added to cart
- **MenuScreen**: Displays menu items with filtering and search
- **BookingScreen**: Handles table reservations
- **OrderScreen**: Manages cart and checkout process

## Contributing

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
