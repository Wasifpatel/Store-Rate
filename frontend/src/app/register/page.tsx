
import { RegisterForm } from '@/components/forms/register-form';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 rounded-full bg-primary p-3 text-primary-foreground">
              <Building className="h-8 w-8" />
            </div>
            <h1 className="font-headline text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Join Store Rate MVP</p>
          </div>
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
