import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";

interface FooterProps {
  storeName?: string;
  location?: string;
  email?: string;
  phone?: string;
}

export function Footer({
  storeName = "Minima",
  location = "123 Minimalist St, Design City",
  email = "hello@minima.com",
  phone = "+1 (555) 123-4567",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{storeName}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Minimalist designs for the modern lifestyle. Quality products with clean aesthetics.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=clothing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products?category=tech" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tech
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">{location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${phone}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t py-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {storeName}. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}