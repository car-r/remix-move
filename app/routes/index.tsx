import Hero from "~/components/Hero";
import HeroReasons from "~/components/HeroReasons";

export default function Index() {
  return (
    <div className="lg:col-span-4 mx-auto max-w-3xl mt-12 pb-44">
      <div className="border-b border-neutral-300">
        <Hero />
      </div>
      <div className="border-b border-neutral-300">
        <HeroReasons />
      </div>
      
      
    </div>
  );
}
