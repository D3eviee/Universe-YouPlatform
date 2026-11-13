import type { ReactNode } from "react";

type InfoPageProps = {
  title: ReactNode;
  children: ReactNode;
};

/** Layout for simple text pages (About, Contact): big heading left, content right. */
export const InfoPage = ({ title, children }: InfoPageProps) => (
  <section className="flex-1 w-full mx-auto mt-10 mb-10 laptop:mt-24 tablet:w-172 laptop:w-5xl">
    <div className="px-5 flex flex-col gap-10 laptop:flex-row laptop:px-0 laptop:gap-18.5">
      <h1 className="w-full text-5xl leading-14 font-medium tracking-tight text-pretty text-primary-dark laptop:font-semibold laptop:tracking-normal">
        {title}
      </h1>
      <div className="w-full flex flex-col gap-4 text-lg font-light leading-7.5 laptop:leading-7">{children}</div>
    </div>
  </section>
);