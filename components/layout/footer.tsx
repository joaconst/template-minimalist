import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { wsp } from "@/lib/utils/wsp";

interface FooterProps {
  storeName?: string;
  location?: string;
  email?: string;
  phone?: string;
  wtsp?: string;
}

export function Footer({
  storeName = "Spectra",
  email = "spectraglasses42@gmail.com",
  phone = wsp,
  wtsp = "WhatsApp"
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{storeName}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
            Somos una empresa familiar dedicada a la importación de lentes de sol y armazones de receta, de excelente calidad y al mejor precio de mercado.
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
                <Link href="/products?categoria=masculino" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lentes de hombre
                </Link>
              </li>
              <li>
                <Link href="/products?categoria=femenino" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lentes de mujer
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
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <a href={`https://wa.me/${wsp}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {wtsp}
                </a>
              </li>   
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/spectra_shopp?igsh=ZjV5NWh4bWYweWJi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://www.facebook.com/share/1AQxsURxnX/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t py-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {storeName}. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}