export const ClientHeading = ({data}:{data: {text:string}}) => {
  return (
    <p className="font-bold text-xl w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 text-header my-3 leading-6 -tracking-[0.374]">
      {data.text}
    </p>
  )
}