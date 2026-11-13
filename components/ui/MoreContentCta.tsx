import Link from "next/link";

export const MoreContentCta = () => (
  <aside aria-labelledby="more-content-heading" className="bg-light-gray/80">
    <div className="px-4 py-8 flex flex-col items-center text-center">
      <p className="text-2xl font-bold border-y-[0.5px] py-0.5 tracking-widest mb-4">NOVUS</p>
      <h2 id="more-content-heading" className="font-extrabold mb-8 text-light-black">
        Keep up with the latest articles and updates, <br />
        directly from Novus
      </h2>
      <Link
        href="/articles"
        className="bg-[#E2E2E9] text-dark-black font-bold text-sm px-4 py-2 rounded-2xl active:scale-95 transition-transform duration-100"
      >
        Read more
      </Link>
    </div>
  </aside>
);