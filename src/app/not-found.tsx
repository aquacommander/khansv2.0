import Link from "next/link";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="shell min-h-[70vh] flex flex-col justify-center py-32">
      <div className="label-system mb-6">Error / 404</div>
      <h1 className="heading-display mb-8">Not found.</h1>
      <p className="body-large max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist, or it moved. Let&apos;s
        get you back on track.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/" variant="solid">
          Back home
        </ButtonLink>
        <Link href="/services" className="btn">
          Browse services
        </Link>
      </div>
    </section>
  );
}
