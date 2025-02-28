import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaCont?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function Hero({
  title = "Lentes Spectra",
  description = "Mini descripción",
  ctaText = "Ver todos los productos",
  ctaCont = "+5493516222999",
  ctaLink = "/products",
  backgroundImage,
}: HeroProps) {
  return (
    <section className="h-screen relative py-20 md:py-28">
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-background/70" />
        </div>
      )}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex">
            <Button asChild size="lg">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
            <Button asChild size="lg" className="ml-4">
              <a
                href={`https://wa.me/${ctaCont.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
