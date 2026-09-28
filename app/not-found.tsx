import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { IconWrench } from "@/components/icons";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary mx-auto mb-6">
        <IconWrench size={32} />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Page Not Found (404)
      </h1>
      <p className="mt-2 text-base text-gray-600 max-w-md mx-auto">
        Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="secondary" size="md">
            Browse Services
          </Button>
        </Link>
      </div>
    </Container>
  );
}
