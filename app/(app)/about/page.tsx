import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants/site";
import { InfoPage } from "@/components/client/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} is all about sparking curiosity and sharing knowledge in the most playful way.`,
};

export default function AboutPage() {
  return (
    <InfoPage title={`${SITE_NAME} is all about sparking curiosity and sharing knowledge in the most playful way.`}>
      <p>
        Founded in 2026, {SITE_NAME} is the first premium publication at the crossroads of lifestyle, global
        culture, and motorsports, dedicated to the people, places, and ideas that make grand prix racing a
        passport to the world.
      </p>
      <p>
        We want to help you look at the world from a different perspective, and our mission is for everyone. We
        set out to be the publication that reflects that world: a guide to the culture, the food, the travel, and
        the singular personalities of motorsports, told with the time and access that real storytelling demands.
        We believe the beauty of technology lies in its marriage with the liberal arts and humanities.
      </p>
    </InfoPage>
  );
}