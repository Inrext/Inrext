"use client";

// ================= TYPES & HELPERS =================

// (Types are now defined in the relevant components if needed)

import AboutHero from "./components/AboutHero";
import EmpoweringInvestors from "./components/EmpoweringInvestors";
import Challenges from "./components/Challenges";
import VisionariesSection from "./components/VisionariesSection";
import StrategicForceSection from "./components/StrategicForceSection";
import PowerhouseTeamSection from "./components/PowerhouseTeamSection";
import Teams from "../routes/homePage/Teams";
import Testimonial from "../routes/homePage/Testimonial";
import WorkWithUs from "../routes/homePage/WorkWithUs";

  const AboutPage = () => {
    return (
      <>
        <AboutHero />
        <EmpoweringInvestors />
        <Challenges />
        <VisionariesSection />
        <StrategicForceSection />
        <Teams />
        <PowerhouseTeamSection />
        <Testimonial />
        <WorkWithUs />
      </>
    );
  };

export default AboutPage;
