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
  storeName = "Spectra",
  email = "spectraglasses42@gmail.com",
  phone = "+5493516222999",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{storeName}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Descripción XXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/products?sexo=masculino" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lentes de hombre
                </Link>
              </li>
              <li>
                <Link href="/products?sexo=femenino" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lentes de mujer
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Compañía</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Políticas de privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contacto</h3>
            <ul className="space-y-2 text-sm">
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
              <a href="https://www.instagram.com/spectra_shopp?igsh=ZjV5NWh4bWYweWJi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
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