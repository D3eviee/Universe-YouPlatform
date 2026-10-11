export const ClientHeading = ({data}:{data: {text:string}}) => {
  return (
    <h3 className="w-90.5 tablet:w-xl laptop:w-163 mx-auto px-2 tablet:px-0 my-6 font-bold text-xl laptop:text-2xl text-dark-black tracking-[0.025em] ">{data.text}</h3>
  )
}