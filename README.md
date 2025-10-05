# Item Management System

A full-stack web application for managing items with a modern, responsive interface. Built with NestJS backend and Next.js frontend.

## 🚀 Features

- **Item Management**: Create, read, update, and delete items
- **Search & Filter**: Advanced search and filtering capabilities
- **Pagination**: Efficient data pagination for large datasets
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Optimistic UI updates
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error boundaries

## 🏗️ Project Structure

```
item-management-system/
├── item_managment_system_be/     # NestJS Backend API
│   ├── src/
│   │   ├── modules/items/        # Items module
│   │   ├── common/              # Shared utilities
│   │   └── config/              # Configuration files
│   ├── package.json
│   └── README.md
├── item_managment_system_fe/     # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # Next.js app router
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities and hooks
│   │   └── types/               # TypeScript types
│   ├── package.json
│   └── README.md
└── README.md                    # This file
```

## 🛠️ Technologies Used

### Backend (`item_managment_system_be`)
- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [TypeORM](https://typeorm.io/) - Object-Relational Mapping
- **Validation**: [class-validator](https://github.com/typestack/class-validator) - Decorator-based validation
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/) - API documentation
- **Testing**: [Jest](https://jestjs.io/) - Testing framework
- **Code Quality**: [Biome](https://biomejs.dev/) - Linter and formatter

### Frontend (`item_managment_system_fe`)
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) - Modern component library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: [TanStack Query](https://tanstack.com/query) - Server state management
- **Forms**: [React Hook Form](https://react-hook-form.com/) - Form handling
- **Icons**: [Lucide React](https://lucide.dev/) - Icon library
- **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (recommended) or npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd item_managment_system_be
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. Start the database (if using Docker):
   ```bash
   ./start-database.sh
   ```

5. Run database migrations and seed data:
   ```bash
   pnpm run seed
   ```

6. Start the development server:
   ```bash
   pnpm run start:dev
   ```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd item_managment_system_fe
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

The frontend will be available at `http://localhost:3001`

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:3000/api`
- JSON Schema: `http://localhost:3000/api-json`

## 🔧 Available Scripts

### Backend Scripts
- `pnpm run start` - Start production server
- `pnpm run start:dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run seed` - Seed database with sample data

### Frontend Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run linter
- `pnpm run type-check` - Run TypeScript type checking

## 🗄️ Database Schema

The application uses a simple but effective database schema:

- **Items Table**: Stores item information with fields like name, description, price, category, etc.
- **Pagination Support**: Built-in pagination for efficient data retrieval
- **Search Indexing**: Optimized for text search operations

## 🎨 UI Components

The frontend includes a comprehensive set of reusable components:

- **Forms**: Item creation and editing forms with validation
- **Tables**: Sortable and filterable data tables
- **Dialogs**: Modal dialogs for item management
- **Pagination**: Custom pagination component
- **Search**: Advanced search and filtering
- **Loading States**: Skeleton loaders and loading indicators

## 🔒 Security Features

- Input validation on both client and server
- SQL injection prevention through TypeORM
- XSS protection
- CORS configuration
- Error handling without sensitive data exposure

## 🧪 Testing

The project includes comprehensive testing:

- **Backend**: Unit tests for services and controllers
- **Frontend**: Component testing with React Testing Library
- **E2E**: End-to-end testing for critical user flows

## 📦 Deployment

### Backend Deployment
- Configure environment variables
- Set up PostgreSQL database
- Run migrations
- Deploy to your preferred platform (Vercel, Railway, etc.)

### Frontend Deployment
- Build the application
- Deploy to Vercel, Netlify, or any static hosting platform
- Configure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**joony786** - [GitHub](https://github.com/joony786)

---

For more detailed information about each part of the application, check the individual README files in the `item_managment_system_be` and `item_managment_system_fe` directories.
