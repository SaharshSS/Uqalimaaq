# Uqalimaaq

Preserving and teaching endangered Native languages through interactive learning experiences.

## Project Structure

This is a monorepo containing the Uqalimaaq language learning platform:

```
├── apps/
│   ├── web/                 # React web application
│   │   ├── public/          # Static assets
│   │   └── src/             # Source code
│   │       ├── components/  # React components
│   │       ├── pages/       # Page components
│   │       └── styles/      # CSS styles
│   └── mobile/              # Mobile app (future)
│       └── assets/          # Mobile assets
├── packages/
│   ├── features/            # Shared features
│   │   ├── lessons/         # Lesson data and types
│   │   └── auth/            # Authentication logic
│   ├── ui/                  # Shared UI components
│   ├── hooks/               # Shared React hooks
│   └── utils/               # Shared utilities
└── website/                 # Legacy website (to be removed)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the web application in development mode:

```bash
cd apps/web
npm start
```

The app will be available at `http://localhost:3000`

### Building

To build the web application for production:

```bash
cd apps/web
npm run build
```

## Features

- **Interactive Language Learning**: Learn endangered Native languages through structured lessons
- **Multiple Languages**: Support for Lushootseed, Chinuk Wawa, Inuktitut, and Tlingit
- **Progressive Learning**: Adaptive difficulty based on user proficiency
- **Audio Support**: Pronunciation guidance (coming soon)
- **AI Chat Assistant**: Interactive language learning support
- **Firebase Integration**: User authentication and data persistence

## Technologies

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3 with custom design system
- **Authentication**: Firebase Auth
- **Build Tool**: Create React App
- **Package Management**: npm workspaces

## Contributing

This project is a community-driven effort to help preserve indigenous languages. Contributions are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.