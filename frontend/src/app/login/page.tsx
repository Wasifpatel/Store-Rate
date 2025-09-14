import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/forms/login-form';
import { Building } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 rounded-full bg-primary p-3 text-primary-foreground">
              <Building className="h-8 w-8" />
            </div>
            <h1 className="font-headline text-3xl font-bold">Store Rate MVP</h1>
            <p className="text-muted-foreground">Sign in to rate and review stores</p>
          </div>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
