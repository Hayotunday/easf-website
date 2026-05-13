import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="font-heading text-4xl font-semibold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gold hover:bg-amber-500 text-primary"
        >
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
