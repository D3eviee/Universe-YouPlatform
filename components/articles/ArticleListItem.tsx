const ArticleListItem = () => {
    return (
        <li role="listitem" className="w-full flex flex-col gap-8 py-8 border-t-[0.5px] border-t-[#C5C5C5]">
            <div className="w-full flex flex-row gap-4 hover:cursor-pointer">
                <div className="w-27 h-27 rounded-2xl bg-[url('/hero-section-bg2.jpg')] bg-cover shrink-0"/>
                <div className="tile__description">
                    <div className="tile__category">Najnowsze</div>
                    <div className="tile__title">Apple wprowadza do Apple Podcasts nowe podcasty wideo</div>
                    <div className="tile__timestamp">13 stycznia 2026</div>
                </div>
            </div>
        </li>
    )
}

export default ArticleListItem