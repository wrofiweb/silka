import Navbar          from "@/components/Navbar";
import ScrollStory     from "@/components/ScrollStory";
import TheGrid         from "@/components/sections/TheGrid";
import MarqueeStrip    from "@/components/sections/MarqueeStrip";
import PricingMatrix   from "@/components/sections/PricingMatrix";
import CoachesShowcase from "@/components/sections/CoachesShowcase";
import SignupForm      from "@/components/sections/SignupForm";

export default function Home() {
  return (
    <div className="w-full bg-black">
      <Navbar />
      <ScrollStory />
      <TheGrid />
      <MarqueeStrip />
      <PricingMatrix />
      <CoachesShowcase />
      <SignupForm />
    </div>
  );
}
