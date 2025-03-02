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
  description = "Somos una empresa familiar dedicada a la importación de lentes de sol y armazones de receta, de excelente calidad y al mejor precio de mercado.",
  ctaText = "Ver todos los productos",
  ctaCont = "5493516222999",
  ctaLink = "/products",
  backgroundImage,
}: HeroProps) {
  return (
    <section id="" className="relative min-h-screen md:min-h-screen py-16 md:py-28 lg:py-32">
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-background/70 md:bg-background/60" />
        </div>
      )}
      
      <Container className="relative z-10 h-full flex items-center">
        <div className="max-w-3xl text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            {title}
          </h1>
          
          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
            {description}
          </p>

          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
            <Button 
              asChild 
              size="lg" 
              className="w-full md:w-auto px-8 py-6 text-sm md:text-base"
            >
              <Link href={ctaLink}>
                {ctaText}
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="w-full md:w-auto px-8 py-6 text-sm md:text-base"
            >
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