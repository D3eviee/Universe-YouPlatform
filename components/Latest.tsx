import React from "react"
import { ArticleThumbnail } from "./ArticleThumbnail"
import { GoToButton } from "./GoToButton"
import { getLatestArticles } from "@/server/queries/articles"

export const Latest = async () => {
  const latestArticles = await getLatestArticles()

  return (
    <section className="w-full flex flex-col px-8 py-16 laptop:pt-20 bg-[#F2F2F5]">
      <h2 className="section-head">Stories</h2>
      
      <ul className="w-full flex flex-col laptop:flex-row laptop:flex-wrap me-auto ms-auto tablet:w-172 laptop:w-242">
        {latestArticles.map((article, index) => (
          <React.Fragment key={article.id}>
            <li className="w-full laptop:w-1/2">
              <ArticleThumbnail article={article} />
            </li>

            {index < latestArticles.length - 1 && <li aria-hidden="true" className="w-full h-px bg-[#C5C5C5] laptop:hidden" />}
            {index % 2 === 1 && index < latestArticles.length - 1 && <li aria-hidden="true" className="hidden laptop:block w-full h-px bg-[#C5C5C5]" />}

          </React.Fragment>
        
        ))}
      </ul>
      
      <GoToButton label="View all" to="/articles" styles="bg-[#E2E2E9]"/>
    </section>
  )
}

      