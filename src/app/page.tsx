import "./home.css";
import { Discovery } from "@/components/home/Discovery";
import { DawnWindow } from "@/components/home/DawnWindow";
import { EdgeLine } from "@/components/home/EdgeLine";
import { Founder } from "@/components/home/Founder";
import { Hero, Scene } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { SceneMount } from "@/components/home/SceneMount";
import { ServiceLanes } from "@/components/home/ServiceLanes";
import { pageMetadata } from "@/content/seo";

/* No structured data of its own: the layout's organization object describes this page,
   and it has to stay the first ld+json script in the home page's HTML. */
export const metadata = pageMetadata({
  title: "Camino Code | Software, data and AI consulting in Newark, NJ",
  description:
    "Camino Code is a software, data and AI consultancy in Newark, New Jersey, for small and mid-sized businesses. It starts with a free conversation.",
  path: "/",
});

export default function Home() {
  return (
    <div className="home">
      {/* first in the home markup, so the Motion control is early in the focus order */}
      <SceneMount />
      <Scene />
      <div className="page">
        <Hero />
        <EdgeLine />
        <ServiceLanes />
        <DawnWindow />
        <Proof />
        <Founder />
        <Discovery />
      </div>
    </div>
  );
}
