const ClientParagraph = ({data}:{data: {text:string}}) => {
  return (
    <p className="paragraph-text mb-6 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 laptop:text-lg laptop:leading-7">
      {data.text}
    </p>
  )
}

export default ClientParagraph