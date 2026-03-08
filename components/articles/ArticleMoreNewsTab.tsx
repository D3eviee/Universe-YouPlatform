const ArticleMoreNewsTab = () => {
    return (
        <div className="bg-[#FAFAFC]">
            <div className="px-16 py-8 flex flex-col items-center">
                <img src="/icon.png" className="h-10 w-10 mb-2"/>
                <h3 className="text-center font-extrabold mb-4 text-[#606065]">The latest news and updates, <br/>directly from the universe</h3>
                <a href="/articles" className="bg-[#E2E2E9] text-[#111112] font-bold text-sm text-center mx-auto px-4 py-2 rounded-2xl active:scale-95 transition-all duration-100">Read more</a>
            </div>
        </div>
    )
}

export default ArticleMoreNewsTab