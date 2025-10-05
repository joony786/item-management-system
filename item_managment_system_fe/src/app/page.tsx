import { ItemsTable } from "@/components/tables/items-table";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 md:py-8 px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Item Management System</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Manage your items with real-time search, pagination, and CRUD operations.
          </p>
        </div>
        
        <ErrorBoundary>
          <ItemsTable />
        </ErrorBoundary>
      </div>
    </div>
  );
}