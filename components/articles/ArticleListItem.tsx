import { format } from "date-fns";

type ArticleListItemProps = {
    id: string;
    title: string;
    slug: string;
    thumbnailImage: string;
    thumbnailDescription: string;
    thumbnailAnnotaion: string;
    thumbnailAlt: string;
    category: string | null;
    publishedAt: Date;
}

const ArticleListItem = ({article}:{article:ArticleListItemProps}) => {
    const {publishedAt, title, category }= article
    const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`
    return (
        <li role="listitem" className="w-full flex flex-col gap-8 py-8 border-t-[0.5px] border-t-[#C5C5C5]">
            <div className="w-full flex flex-row gap-4 hover:cursor-pointer">
                <div className="w-27 h-27 rounded-2xl bg-[url('/hero-section-bg2.jpg')] bg-cover shrink-0"/>
                <div className="tile__description">
                    <div className="tile__category">{category}</div>
                    <div className="tile__title">{title}</div>
                    <div className="tile__timestamp">{publishedAtForrmated}</div>
                </div>
            </div>
        </li>
    )
}

export default ArticleListItem