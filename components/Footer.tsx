const Footer = () => { 
   
    return (
        <footer className="bg-[#F2F2F5] flex flex-col gap-2 w-full py-4 px-4 items-center">
            <p className="text-[#5F5F60] text-xs font-base">Copywright &copy; Universe&You. All rights reserved.</p>

            <div className="flex flex-row gap-2">
                <p className="text-[#343435] text-xs font-medium after:border-r-[0.5px] after:pl-2">Privacy Policy</p>
                <p className="text-[#343435] text-xs font-medium">Terms of Use</p>
            </div>
        </footer>
    )
}

export default Footer