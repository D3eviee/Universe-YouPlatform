import Books from "../components/Books";
import Hero from "../components/Hero";
import Latest from "../components/Latest";
import Quote from "../components/Quote";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <Hero/>
      <Quote/>
      <Latest/>
      <Books/>
    </div>
  );
}