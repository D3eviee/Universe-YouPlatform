export default function Contact() {
  return (
    <section className="flex-1 w-3/4 ms-auto me-auto tablet:w-172 laptop:w-242 mb-10 pt-12 tablet:pt-20 laptop:mt-24">
      <h1 className="text-primary-dar font-semibold text-4xl mb-14 tablet:text-center tablet:text-5xl">Contacting Us</h1>
      <div className="flex flex-col tablet:flex-row tablet:gap-16 laptop:gap-20 tablet:px-6">
        <div className="mb-10 w-full">
          <h2 className="text-secondary-dark font-bold text-xl leading-none mb-2 tablet:text-2xl">About us</h2>
          <p className="text-pretty text-secondary-dark text-base font-normal tablet:text-md">Our goal is straightforward: we explore the most fascinating mysteries of space, physics, biology, technology and business, and explain them in plain, everyday language. Stick around, explore, and discover how amazing our universe really is—simply and effortlessly.</p>
        </div>

        <div className="w-full">
          <h2 className="text-secondary-dark font-bold text-xl leading-none mb-2 tablet:text-2xl">How can we help you?</h2>
          <p className="text-pretty text-secondary-dark text-base font-normal tablet:text-md">If you want to ask a question, propose a new topic for article or report mistake or error, use provided e-mail to contact with us: <span className="font-medium">hipolitroszkowski@protonmail.ch</span></p>
        </div>
      </div>
    </section>
  );
}