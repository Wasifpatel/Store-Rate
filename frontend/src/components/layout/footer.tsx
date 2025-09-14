import { Building, Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold font-headline text-foreground">Store Rate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The best place to rate and review your favorite local stores.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold font-headline mb-3 text-foreground">Support</h3>
            <ul className="space-y-1.5">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold font-headline mb-3 text-foreground">Follow Us</h3>
            <div className="flex space-x-2">
              <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8">
                <Link to="#"><Twitter className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8">
                <Link to="#"><Facebook className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8">
                <Link to="#"><Instagram className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Store Rate MVP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
