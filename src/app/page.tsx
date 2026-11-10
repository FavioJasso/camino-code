import type { Metadata } from "next";
import "./home.css";
import { Discovery } from "@/components/home/Discovery";
import { DawnWindow } from "@/components/home/DawnWindow";
import { EdgeLine } from "@/components/home/EdgeLine";
import { Founder } from "@/components/home/Founder";
import { Hero, Scene } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { SceneMount } from "@/components/home/SceneMount";
import { ServiceLanes } from "@/components/home/ServiceLanes";

export const metadata: Metadata = { alternates: { canonical: "/" } };

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
