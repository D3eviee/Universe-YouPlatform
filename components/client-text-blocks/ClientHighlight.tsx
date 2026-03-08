type ClientHighlightProps = {
  text: string;
}

const ClientHighlight = ({data}:{data:ClientHighlightProps}) => {
  return (
    <p className="mx-auto w-[86%] max-w-91.5 mb-8 bg-[#F5F5F7] text-base rounded-xl text-center font-normal py-3 text-[#1D1D1F] border-[0.5px] border-[#F7F7F9] shadow-sm">{data.text}</p>
  )
}

export default ClientHighlight