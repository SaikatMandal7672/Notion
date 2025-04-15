
import { Background } from "./_components/Background";
import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

export default function Home() {
  return (<>
    <div className="min-h-full flex  flex-col bg-[#edfff5] dark:bg-neutral-950">
      <div className="flex flex-col justify-center items-center text-center gap-y-12 flex-1 px-6 pb-10 ">
        <Heading />
        <Heroes />
      </div>
      <Footer />

    </div>
    <Background />
    
  </>
  );
}
