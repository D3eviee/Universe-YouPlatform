const GoToButton = ({label, to, styles}:{label:string, to:string, styles:string}) => {
  return (
    <div className="flex justify-center mt-6 laptop:mt-12">
        <a 
            href={to}
            role="button"
            className={`font-semibold mx-auto me-auto ms-auto px-6 py-2.5 rounded-2xl text-[#161618] laptop:text-lg ${styles}`}>{label}
        </a>
    </div>
  )
}

export default GoToButton