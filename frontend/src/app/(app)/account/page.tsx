import { useAuth } from '@/components/auth/use-auth';
import { PasswordUpdateForm } from '@/components/forms/password-update-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Account Information</CardTitle>
          <CardDescription>Your personal details and role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'owner' ? 'secondary' : 'default'}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </>
          ) : (
            <p>Loading user information...</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Update Password</CardTitle>
          <CardDescription>Change your password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordUpdateForm />
        </CardContent>
      </Card>
    </div>
  );
}
