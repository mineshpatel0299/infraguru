import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CareersIntro from "@/components/careers/CareersIntro";
import CareersValues from "@/components/careers/CareersValues";
import CareersOpenings from "@/components/careers/CareersOpenings";
import CareersCTA from "@/components/careers/CareersCTA";
import { listOpenJobs } from "@/lib/db/jobs";
import CareersPageMotion from "./CareersPageMotion";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await listOpenJobs();

  return (
    <CareersPageMotion>
      <Navbar />
      <CareersHero />
      <CareersIntro />
      <CareersValues />
      <CareersOpenings jobs={jobs} />
      <CareersCTA />
      <Footer />
    </CareersPageMotion>
  );
}
