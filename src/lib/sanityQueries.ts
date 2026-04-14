export const GROQ_LOCATIONS = `*[_type == "location" && defined(slug.current)] {
  "slug": slug.current,
  name
}`;

export const GROQ_LOCATION_BY_SLUG = `*[_type == "location" && slug.current == $slug][0] {
  name,
  zip,
  context,
  competitors,
  "slug": slug.current
}`;

export const GROQ_LEGAL_PAGE_BY_SLUG = `*[_type == "legalPage" && slug.current == $slug][0] {
  title,
  content
}`;

export const GROQ_ALL_SERVICE_SLUGS = `*[_type == "service" && defined(slug.current)][].slug.current`;

export const GROQ_SERVICE_BY_SLUG = `*[_type == "service" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  seo,
  hero {
    headline,
    subline,
    "bgImageUrl": bgImage.asset->url
  },
  content,
  category,
  focus,
  kpis,
  "managedBy": managedBy->{
    name,
    role,
    "image": image.asset->url,
    bio,
    sameAs,
    knowsAbout
  },
  "caseStudies": caseStudies[]->{
    clientName,
    challenge,
    solution,
    result,
    "videoUrl": video.asset->url
  },
  "spotlightCaseStudy": spotlightCaseStudy->{
    clientName,
    "logo": logo.asset->url,
    spotlightHeadline,
    spotlightDescription,
    "quote": {
      "text": quoteText,
      "author": quoteAuthor,
      "role": quoteAuthorRole,
      "image": quoteAuthorImage.asset->url
    }
  },
  faqs[] {
    question,
    answer
  },
  technicalSpecs,
  priceRange,
  "date": _createdAt
}`;

export const GROQ_HOMEPAGE = `*[_type == "homepage"][0] {
  logos[] {
    name,
    "imageUrl": image.asset->url,
    textMarkup,
    customClass
  },
  heroBadge,
  heroHeadline,
  heroSubline,
  ctaText,
  trustCount,
  trustText,
  introSection,
  "expertiseSection": expertiseSection {
    headline,
    "imageUrl": image.asset->url,
    "screenVideoUrl": screenVideo.asset->url,
    contentBlocks[] {
      leadIn,
      text
    }
  },
  servicesSection,
  testimonialsSection,
  "teamSection": teamSection {
    headline,
    members[]->{
      name,
      role,
      "image": image.asset->url
    }
  },
  "casesSection": casesSection {
    headline,
    subline,
    cases[]->{
      clientName,
      "image": projectImage.asset->url,
      challenge,
      solution
    }
  },
  "proofOfConceptSection": proofOfConceptSection {
    headline,
    cases[] {
      title,
      "imageUrl": image.asset->url,
      badge,
      challenge,
      solution,
      metrics[] {
        value,
        label
      },
      linkText
    }
  },
  "founderDemoSection": founderDemoSection {
    headline,
    subline,
    videoUrl
  },
  "multiWorkspaceSection": multiWorkspaceSection {
    headline,
    "imageUrl": image.asset->url,
    features[] {
      title,
      description
    }
  },
  "adbitesAdLift": adbitesAdLift {
    headline,
    subline,
    cards[] {
      "src": image.asset->url,
      alt,
      targetClass,
      badgeText,
      badgeColor,
      badgePosition
    },
    logos[] {
      name,
      "imageUrl": image.asset->url,
      textMarkup,
      customClass
    },
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl
  },
  seo
}`;

export const GROQ_SCHEMA_GRAPH = `{
  "organization": *[_type == "organization"][0] {
    name,
    legalName,
    url,
    foundingDate,
    "logo": logo.asset->url,
    description,
    taxId,
    vatId,
    isoCode,
    sameAs,
    address,
    geo,
    contactPoints[] {
      contactType,
      email,
      telephone
    },
    "founders": founders[]->{
      name,
      "image": image.asset->url,
      sameAs,
      role
    },
    knowsAbout,
    areaServed,
    managedBudget,
    specialization
  },
  "person": *[_type == "person"][0] {
    name,
    role,
    "image": image.asset->url,
    bio,
    sameAs,
    knowsAbout
  },
  "services": *[_type == "service"] {
    title,
    category
  }
}`;

export const GROQ_ORGANIZATION = `*[_type == "organization"][0] {
  name,
    legalName,
    description,
  "logo": logo.asset->url,
  address,
  contactPoints[] {
    contactType,
    email,
    telephone
  },
  sameAs
}`;

export const GROQ_PERSON = `*[_type == "person"][0] {
  name,
  role,
  "image": image.asset->url,
  bio,
  sameAs,
  knowsAbout
}`;

// Blog Queries
export const GROQ_ALL_POSTS = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  "author": author->{
    name,
    "image": image.asset->url
  },
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  publishedAt,
  excerpt
}`;

export const GROQ_ALL_POST_SLUGS = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const GROQ_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  "author": author->{
    name,
    role,
    bio,
    "image": image.asset->url,
    sameAs
  },
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  publishedAt,
  excerpt,
  body,
  faqs[] {
    question,
    answer
  },
  sources[] {
    title,
    url
  },
  seoGroup
}`;
