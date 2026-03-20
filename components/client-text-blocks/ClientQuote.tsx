type ClientQuoteProps = {
  quote: string;
  quoteAuthor: string;
  authorRole: string;
}

const ClientQuote = ({data}:{data: ClientQuoteProps}) => {
  return (
    <figure className="mx-auto w-3/4 max-w-91.5 flex flex-col justify-center items-center mb-8">
      <blockquote className="font-medium text-xl text-center text-[#1D1D1F] leading-6 mb-2.5">
        {data.quote}
      </blockquote>
      <p className="font-medium -tracking-[0.325] text-[#1D1D1F]">{data.quoteAuthor}</p>
      <p className="text-xs font-semibold text-[#6E6E73]">{data.authorRole}</p>
    </figure>
  )
}

export default ClientQuote