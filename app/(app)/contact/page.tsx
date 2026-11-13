import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants/site";
import { InfoPage } from "@/components/client/InfoPage";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_NAME} about collaborations, questions or feedback.`,
};

export default function ContactPage() {
  return (
    <InfoPage title={`Contacting ${SITE_NAME}`}>
      <p>
        Interested in collaborating? Have a question, or just want to share your thoughts about our work?
        We&rsquo;d love to hear from you.
      </p>
      <p>
        Write to us at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary-dark"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </InfoPage>
  );
}