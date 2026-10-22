/**
 * The six services. Each one renders its own page at /services/<slug>/ and
 * a card on the home and services index pages.
 *
 * Copy rules (see PROJECT_CONTEXT.md): describe the work honestly, never
 * promise a result, never give legal advice.
 */
export type Service = {
  slug: string;
  name: string;
  /** Under ~60 chars with the brand suffix appended. */
  title: string;
  /** Under ~160 chars. */
  metaDescription: string;
  summary: string;
  icon: IconName;
  intro: string[];
  problems: string[];
  approach: { title: string; body: string }[];
  includes: string[];
  faqs: { q: string; a: string }[];
};

export type IconName = 'id' | 'search' | 'user' | 'store' | 'shield' | 'radar';

export const services: Service[] = [
  {
    slug: 'mugshot-removal',
    name: 'Mugshot & Arrest Record Removal',
    title: 'Mugshot Removal Service',
    metaDescription:
      'Get help removing mugshots and arrest records from websites and Google search results. Confidential mugshot removal service available in all 50 states.',
    summary:
      'Request removal of booking photos and arrest records from mugshot websites, news archives and search results.',
    icon: 'id',
    intro: [
      'A booking photo can follow you long after a case is dismissed, sealed or resolved. Mugshot websites copy arrest records from public sources and publish them where employers, landlords and new acquaintances can find them with a simple search.',
      'We identify every place your booking photo and arrest information appears, then work through the removal and de-indexing routes available for each site — from publisher removal policies to search engine request processes — and keep watch for the record resurfacing.',
    ],
    problems: [
      'A mugshot appears on the first page of Google for your name',
      'Your photo has been copied across multiple mugshot websites',
      'Charges were dropped, dismissed or sealed but the photo remains online',
      'A local news archive still shows an old arrest story',
    ],
    approach: [
      {
        title: 'Locate every copy',
        body: 'We search mugshot aggregators, people-search sites, news archives and image search to build a full inventory of where your record appears.',
      },
      {
        title: 'Submit removal requests',
        body: 'We prepare and submit removal requests under each site’s own policies and any applicable state rules, and follow up until each request is resolved.',
      },
      {
        title: 'Clear search results',
        body: 'Once a page is removed or updated, we request that search engines refresh or drop the outdated result so the cached copy stops appearing.',
      },
      {
        title: 'Monitor for reposts',
        body: 'Mugshot sites frequently re-scrape public records. We keep monitoring and act quickly if your record reappears.',
      },
    ],
    includes: [
      'Full inventory of sites showing your booking photo or arrest record',
      'Removal requests to publishers and aggregators',
      'Search engine outdated-content and de-indexing requests',
      'Ongoing monitoring for reposted records',
      'Plain-English progress reports',
    ],
    faqs: [
      {
        q: 'Can every mugshot be removed?',
        a: 'Not always. Results depend on the website, its policies and the laws that apply. Where removal is not possible, we can often reduce visibility through search suppression. We will tell you honestly what we expect before you commit.',
      },
      {
        q: 'Do I need my record expunged or sealed first?',
        a: 'Not necessarily, but a sealed or expunged record can make some removal requests stronger. Expungement and sealing are legal processes — we are not a law firm and do not provide legal advice, so we recommend speaking with a licensed attorney in your state about your eligibility.',
      },
      {
        q: 'Can I request removal myself?',
        a: 'Yes. Several states give people the right to ask certain websites to remove a booking photo free of charge, especially after a case is dismissed or sealed, and many sites and search engines accept requests directly. You never need to hire anyone to exercise those rights. Clients come to us when there are many copies to track down, when requests stall, or when they would rather have it handled for them.',
      },
      {
        q: 'Will the mugshot come back?',
        a: 'It can, because records are public and sites re-scrape them. That is why monitoring is part of the service.',
      },
    ],
  },
  {
    slug: 'search-result-suppression',
    name: 'Negative Search Result Suppression',
    title: 'Negative Search Result Suppression',
    metaDescription:
      'Push negative articles, posts and unfair content down in Google search results with accurate, positive content you control. Serving clients nationwide.',
    summary:
      'Reduce the visibility of damaging articles and posts by building accurate, positive content that outranks them.',
    icon: 'search',
    intro: [
      'Most people never look past the first page of search results. When a negative article, forum thread or complaint-site post ranks for your name or business, it shapes first impressions before you ever have a chance to speak.',
      'When content cannot be removed outright, suppression is the most reliable way to limit its impact. We build and strengthen accurate, professional web properties that deserve to rank — and help them earn the visibility to push unwanted results further down.',
    ],
    problems: [
      'An old or misleading news article ranks for your name',
      'Complaint-site or forum posts appear on page one',
      'A former business partner or competitor published unfair content',
      'Search results for your name are thin, so one negative item dominates',
    ],
    approach: [
      {
        title: 'Audit your search results',
        body: 'We map what appears for your name or brand across Google and Bing, and identify which results are harming you and why they rank.',
      },
      {
        title: 'Build authoritative assets',
        body: 'We create and optimize accurate profiles, personal or business websites, articles and professional listings that reflect who you are today.',
      },
      {
        title: 'Strengthen what ranks',
        body: 'Using white-hat SEO, we improve the authority and relevance of your positive assets so search engines favor them.',
      },
      {
        title: 'Measure and adjust',
        body: 'We track rankings for your key search terms and adjust strategy as results move.',
      },
    ],
    includes: [
      'Search result audit for your name or brand',
      'Creation and optimization of positive web properties',
      'Ongoing white-hat SEO for your assets',
      'Ranking reports for your target search terms',
      'Removal requests wherever a policy-based route exists',
    ],
    faqs: [
      {
        q: 'How long does suppression take?',
        a: 'It varies with how strong the negative result is and how competitive your name is. Many clients see movement within a few months, but we never promise a specific timeline or ranking.',
      },
      {
        q: 'Is suppression the same as deletion?',
        a: 'No. Suppression lowers the visibility of content that remains online. Where a legitimate removal route exists, we pursue that too.',
      },
      {
        q: 'Do you publish fake content?',
        a: 'No. Every asset we create is accurate and attributable. Misleading content undermines trust and can violate search engine policies.',
      },
    ],
  },
  {
    slug: 'personal-reputation-management',
    name: 'Personal Reputation Management',
    title: 'Personal Reputation Management',
    metaDescription:
      'Protect your name online. Personal reputation management for professionals, executives and private individuals in all 50 states.',
    summary:
      'Take control of what people find when they search your name — for professionals, executives and private individuals.',
    icon: 'user',
    intro: [
      'Employers, clients, landlords and even first dates search your name before they meet you. What they find is your first impression, whether or not it is accurate.',
      'Our personal reputation program combines removal, suppression, privacy protection and content development into one plan built around your goals — whether that is recovering from a specific incident or simply making sure your search results reflect your best self.',
    ],
    problems: [
      'You are changing careers or applying for senior roles',
      'A past incident still dominates searches for your name',
      'You share a name with someone who has negative coverage',
      'You want a professional online presence but have little to show',
    ],
    approach: [
      {
        title: 'Discovery',
        body: 'We learn your goals and review everything that appears for your name across search, social media and people-search sites.',
      },
      {
        title: 'Custom plan',
        body: 'We recommend the right mix of removal, suppression and content development for your situation — nothing you do not need.',
      },
      {
        title: 'Build your presence',
        body: 'We develop professional profiles, a personal website and published content that accurately represents you.',
      },
      {
        title: 'Protect and maintain',
        body: 'We monitor for new mentions and keep your positive presence current.',
      },
    ],
    includes: [
      'Full personal search audit',
      'Custom reputation strategy',
      'Personal website and profile development',
      'Search suppression where needed',
      'Ongoing monitoring and reporting',
    ],
    faqs: [
      {
        q: 'Who is personal reputation management for?',
        a: 'Anyone whose search results matter to them — job seekers, executives, physicians, educators, public figures and private individuals alike.',
      },
      {
        q: 'Is my information kept confidential?',
        a: 'Yes. Discretion is central to what we do, and we only use your information to deliver the services you request.',
      },
    ],
  },
  {
    slug: 'business-review-management',
    name: 'Business & Review Management',
    title: 'Business Reputation & Reviews',
    metaDescription:
      'Improve your business reputation online. Review monitoring, response strategy, policy-violating review removal requests and brand search cleanup.',
    summary:
      'Monitor reviews, respond professionally, flag policy-violating reviews and strengthen how your brand appears in search.',
    icon: 'store',
    intro: [
      'Customers compare businesses in seconds, and star ratings and review snippets often decide who gets the call. A handful of unfair reviews or a single negative article can cost real revenue.',
      'We help businesses of every size monitor their reputation across review platforms and search, respond professionally, flag reviews that break platform rules, and encourage genuine feedback from real customers.',
    ],
    problems: [
      'Fake or policy-violating reviews are dragging down your rating',
      'Negative reviews go unanswered and look unprofessional',
      'Your best customers rarely leave reviews',
      'A complaint-site listing ranks for your brand name',
    ],
    approach: [
      {
        title: 'Reputation audit',
        body: 'We review your ratings, review content and brand search results across the platforms your customers use.',
      },
      {
        title: 'Flag policy violations',
        body: 'We identify reviews that appear to violate platform guidelines — such as spam, conflicts of interest or off-topic content — and submit them through each platform’s reporting process.',
      },
      {
        title: 'Respond and resolve',
        body: 'We help you craft professional, on-brand responses that show prospective customers you care.',
      },
      {
        title: 'Grow genuine reviews',
        body: 'We set up compliant processes that make it easy for real customers to share honest feedback.',
      },
    ],
    includes: [
      'Review monitoring across major platforms',
      'Policy-violation flagging and follow-up',
      'Review response guidance and templates',
      'Compliant review-request workflows',
      'Brand search result cleanup',
    ],
    faqs: [
      {
        q: 'Can you delete negative reviews?',
        a: 'Only the review platform can remove a review, and only when it breaks that platform’s rules. We identify reviews that appear to violate policy and report them through the proper channels. We do not remove honest reviews and never post fake ones.',
      },
      {
        q: 'Do you write reviews for businesses?',
        a: 'No. Fake reviews violate platform policies and federal law. We help you earn more genuine reviews from real customers.',
      },
    ],
  },
  {
    slug: 'personal-information-removal',
    name: 'Personal Information Removal',
    title: 'Personal Information Removal',
    metaDescription:
      'Remove your home address, phone number and personal details from data broker and people-search sites. Privacy protection for individuals and families.',
    summary:
      'Opt out of data broker and people-search sites that publish your address, phone number, relatives and history.',
    icon: 'shield',
    intro: [
      'People-search and data broker websites compile your home address, phone numbers, email addresses, relatives, age and history into profiles anyone can view — often for free.',
      'We submit opt-out requests to these sites on your behalf, confirm the removals, and repeat the process regularly, because brokers routinely re-add profiles as they acquire new data.',
    ],
    problems: [
      'Your home address appears in a search for your name',
      'You are receiving unwanted calls, mail or contact',
      'You work in a sensitive profession or have safety concerns',
      'Relatives’ names and details are linked to your profile',
    ],
    approach: [
      {
        title: 'Scan',
        body: 'We search major people-search and data broker sites for profiles containing your information.',
      },
      {
        title: 'Opt out',
        body: 'We submit removal requests through each site’s opt-out process and handle any verification steps we can on your behalf.',
      },
      {
        title: 'Verify',
        body: 'We confirm each removal and follow up on requests that stall.',
      },
      {
        title: 'Repeat',
        body: 'We rescan on a regular schedule and remove profiles that reappear.',
      },
    ],
    includes: [
      'Scan of major people-search and data broker sites',
      'Opt-out submissions on your behalf',
      'Removal verification and follow-up',
      'Recurring rescans and re-removal',
      'Search engine requests to remove personal contact details',
    ],
    faqs: [
      {
        q: 'Why do profiles come back?',
        a: 'Data brokers continually buy and compile new records. A profile removed today can be rebuilt from fresh data later, which is why ongoing rescans matter.',
      },
      {
        q: 'Can you cover my family members?',
        a: 'Yes. Household coverage can be included so relatives linked to your profile are protected too.',
      },
    ],
  },
  {
    slug: 'brand-monitoring',
    name: 'Brand Monitoring',
    title: 'Online Brand & Name Monitoring',
    metaDescription:
      'Know when your name or brand is mentioned online. Search, news, review and social monitoring with alerts and clear reporting.',
    summary:
      'Get alerted when your name or brand appears in search, news, reviews or social media — so you can act early.',
    icon: 'radar',
    intro: [
      'Reputation problems are easiest to manage when they are caught early. A new article, review or post can climb search results quickly if nobody notices it.',
      'Our monitoring service watches search results, news, review platforms and social media for mentions of your name or brand, flags what matters, and recommends a response before small issues become big ones.',
    ],
    problems: [
      'You only learn about negative content after it has spread',
      'You want to know when a removed result reappears',
      'You need regular visibility into how your brand appears online',
    ],
    approach: [
      {
        title: 'Define what to watch',
        body: 'We agree on the names, brands, keywords and platforms that matter to you.',
      },
      {
        title: 'Monitor continuously',
        body: 'We track search results, news, reviews and social mentions for changes.',
      },
      {
        title: 'Alert and advise',
        body: 'When something significant appears, we alert you with context and a recommended next step.',
      },
      {
        title: 'Report',
        body: 'Regular reports show how your search results and sentiment are trending over time.',
      },
    ],
    includes: [
      'Name and brand mention tracking',
      'Search result change alerts',
      'Review and news monitoring',
      'Recommended responses',
      'Regular trend reports',
    ],
    faqs: [
      {
        q: 'Is monitoring included with other services?',
        a: 'Monitoring is built into our removal and suppression work, and is also available on its own.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
