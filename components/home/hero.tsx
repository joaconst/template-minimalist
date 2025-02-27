import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function Hero({
  title = "Minimalist Design for Modern Living",
  description = "Discover our curated collection of minimalist products designed to enhance your everyday life with simplicity and elegance.",
  ctaText = "Shop Now",
  ctaLink = "/products",
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative py-20 md:py-28 lg:py-36">
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
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}