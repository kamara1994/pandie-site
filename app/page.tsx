import Hero from "./components/Hero";
import JourneyBanner from "./components/JourneyBanner";
import CoreServices from "./components/CoreServices";
import FeatureRow from "./components/FeatureRow";
import SplitEvent from "./components/SplitEvent";
import Impact from "./components/Impact";

export default function Page() {
  return (
    <>
      <Hero />
      <JourneyBanner />
      <CoreServices />
      <FeatureRow />
      <SplitEvent />
      <Impact />
    </>
  );
}