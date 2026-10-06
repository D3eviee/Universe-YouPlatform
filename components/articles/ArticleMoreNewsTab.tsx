export const ArticleMoreNewsTab = () => {
    return (
        <div className="bg-light-gray/80">
            <div className="px-4 py-8 flex flex-col items-center">
                <h3 className="text-2xl font-bold border-t-[0.5px] border-b-[0.5px] py-0.5 tracking-widest mb-4">NOVUS</h3>
                <h3 className="text-center font-extrabold mb-8 text-light-black">Keep with the latest articles and updates, <br/>directly from the Novus</h3>
                <a href="/articles" className="bg-[#E2E2E9] text-dark-black font-bold text-sm text-center mx-auto px-4 py-2 rounded-2xl active:scale-95 transition-all duration-100">Read more</a>
            </div>
        </div>
    )
}