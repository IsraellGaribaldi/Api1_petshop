# Petshop Frontend

This project is a React application for a pet shop, featuring user authentication and a dashboard for managing pet-related information.

## Project Structure

```
petshop-front
├── src
│   ├── index.tsx          # Entry point of the application
│   ├── App.tsx            # Main application component with routing
│   ├── components
│   │   └── Login.tsx      # Login component for user authentication
│   ├── pages
│   │   └── Dashboard.tsx   # Dashboard component for logged-in users
│   ├── routes
│   │   └── index.tsx      # Routing configuration for the application
│   └── types
│       └── index.ts       # TypeScript types and interfaces
├── public
│   └── index.html         # Main HTML file for the application
├── package.json            # npm configuration and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Features

- User authentication with email and password.
- Form validation for login credentials.
- Dashboard for managing pet-related information after login.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd petshop-front
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.