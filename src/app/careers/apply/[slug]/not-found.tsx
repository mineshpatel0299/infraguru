import Image from "next/image";
import SealLink from "@/components/SealLink";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-soft px-6 text-center">
      <Image
        src="/logo.png"
        alt="Infraguru"
        width={160}
        height={52}
        className="mb-10 h-11 w-auto object-contain"
      />
      <span className="eyebrow justify-center">Role Not Found</span>
      <h1 className="mb-5 max-w-lg text-[clamp(2rem,2.5vw,3rem)] text-primary-dark">
        This Position Isn&rsquo;t On Record
      </h1>
      <p className="mb-10 max-w-md text-[1.02rem] leading-[1.7] text-muted">
        The role you&rsquo;re looking for may have closed or never existed. Let&rsquo;s get you
        back to our current openings.
      </p>
      <SealLink href="/careers#careers-openings" className="btn-primary rounded-full">
        View Open Roles
      </SealLink>
    </main>
  );
}
