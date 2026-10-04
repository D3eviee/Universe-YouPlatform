export default function AboutPage() {
  return (
    <section className="flex-1 mx-auto tablet:w-172 laptop:w-5xl mb-10 laptop:mt-24">
      <div className="flex flex-row gap-18.5">
        <h1 className="text-primary-dark font-semibold text-5xl w-full leading-14">Novus is all about sparking curiosity and sharing knowledge in the most joyful way.</h1>
        <div className="flex flex-col w-full">
          <p className="text-lg font-base text-pretty text-secondary-dark mb-8">Founded in 2026, Novus is the first premium publication at the crossroads of lifestyle, global culture, and motorsports, dedicated to the people, places, and ideas that make grand prix racing a passport to the world.</p>
          <p className="text-lg font-base text-pretty text-secondary-dark">We try to make you look at the world from other perspecitve. We believe our mission is directed to everyone. We set out to be the publication that reflects that world: a guide to the culture, the food, the travel, and the singular personalities of motorsports, told with the time and access that real storytelling demands. We believe the beauty of technology marries the liberal arts and humanities</p>
        </div>
      </div>
    </section>
  );
}