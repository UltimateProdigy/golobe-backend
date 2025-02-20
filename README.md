# Golobe - Your Complete Travel Companion

## Overview
Golobe is a comprehensive travel booking platform that enables users to book flights, hotels, and activities all in one place. Our platform aims to simplify the travel planning process by providing a seamless, user-friendly interface for all your travel needs.

## Features

### Core Functionalities
- **Flight Booking**
  - Search and compare flights from multiple airlines
  - Filter by price, duration, stops, and airlines
  - Seat selection and meal preferences
  - Multi-city booking support

- **Hotel Booking**
  - Extensive hotel database worldwide
  - Advanced filtering by amenities, price, and rating
  - Room type selection
  - Virtual hotel tours and photo galleries

- **Activity & Attraction Tickets**
  - Local tours and experiences
  - Tourist attractions and landmarks
  - Event tickets
  - Guided tours

### Additional Features
- User account management
- Booking history and tracking
- Price alerts and notifications
- Mobile-responsive design
<!-- - Multi-currency support
- Multi-language interface
- Secure payment processing
- Email confirmation system -->

## Technical Stack

### Frontend
- React.js
- Tailwind CSS for styling
- Redux for state management
- Shadcn components

### Backend
- Node.js with Express
- MongoDB for database
- Redis for caching
- JWT for authentication

<!-- ### APIs Integrated
- Flight booking APIs (Amadeus/Sabre)
- Hotel booking APIs (Booking.com/Expedia)
- Payment gateway APIs
- Maps and location services -->

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- MongoDB
- Redis
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/UltimateProdigy/golobe.git
cd golobe
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration

4. Start the development server
```bash
npm run dev
```

### Environment Variables
```
DATABASE_URL=mongodb://localhost:27017/golobe
JWT_SECRET=your_jwt_secret
```

## Project Structure
```
golobe/
├── client/           # Frontend React application
├── server/           # Backend Node.js application
├── common/           # Shared utilities and types
├── docs/            # Documentation
└── scripts/         # Build and deployment scripts
```

## API Documentation
Detailed API documentation is available at `/docs/api.md`

## Testing
```bash
# Run frontend tests
npm run test:client

# Run backend tests
npm run test:server

# Run e2e tests
npm run test:e2e
```


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Contact
- Project Lead - [Akinola Ayobami](mailto:ayobamiakinola84@gmail.com)
- Project Link: https://github.com/UltimateProdigy/golobe

## Acknowledgments
- List of third-party services and libraries used
- Design inspiration
- Contributors

## Roadmap
- [ ] Implement AI-powered travel recommendations
- [ ] Add vacation packages booking
- [ ] Integrate car rental services
- [ ] Add travel insurance options
- [ ] Implement chat support
- [ ] Add loyalty program