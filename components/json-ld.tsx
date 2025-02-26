import React from "react";
import Script from "next/script";

interface OrganizationLDProps {
  url: string;
  logoUrl: string;
  name: string;
}

export const OrganizationLD: React.FC<OrganizationLDProps> = ({
  url,
  logoUrl,
  name,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    url: url,
    logo: logoUrl,
    name: name,
    sameAs: [
      "https://twitter.com/opensocialworld", // Replace with actual social profiles
      "https://github.com/opensocialworld",
      "https://linkedin.com/company/opensocialworld",
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface ResearchArticleLDProps {
  url: string;
  headline: string;
  description: string;
  authorName: string;
  authorUrl: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
}

export const ResearchArticleLD: React.FC<ResearchArticleLDProps> = ({
  url,
  headline,
  description,
  authorName,
  authorUrl,
  imageUrl,
  datePublished,
  dateModified,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: headline,
    description: description,
    image: imageUrl,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Open Social World",
      logo: {
        "@type": "ImageObject",
        url: "https://opensocialworld.org/logo.png", // Update with actual logo path
      },
    },
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
