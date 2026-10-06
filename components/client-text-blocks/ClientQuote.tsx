type ClientQuoteProps = {
  quote: string;
  quoteAuthor: string;
  authorRole: string;
}

export const ClientQuote = ({data}:{data: ClientQuoteProps}) => {
  return (
    <figure className="mx-auto w-3/4 max-w-91.5 flex flex-col justify-center items-center mb-8">
      <blockquote className="font-medium text-xl text-center text-header leading-6 mb-2.5">
        {data.quote}
      </blockquote>
      <p className="font-medium -tracking-[0.325] text-header">{data.quoteAuthor}</p>
      <p className="text-xs font-semibold text-dark-gray">{data.authorRole}</p>
    </figure>
  )
}
