/** The client journey. Used on the home page (summary) and /how-it-works/ (detail). */
export const steps = [
  {
    title: 'Confidential consultation',
    summary: 'Tell us what you are facing. We listen, ask the right questions and explain your options.',
    detail:
      'Every engagement starts with a private conversation about what you are dealing with and what you want to achieve. There is no obligation, and we will be candid about what we think is realistic.',
  },
  {
    title: 'Reputation audit',
    summary: 'We map everything that appears for your name or business across search and key sites.',
    detail:
      'We review search results across Google and Bing, mugshot and people-search sites, news archives, review platforms and social media to understand exactly what is out there and why it ranks.',
  },
  {
    title: 'Custom strategy',
    summary: 'You receive a clear plan combining removal, suppression and protection — only what you need.',
    detail:
      'Based on the audit, we recommend the right combination of removal requests, search suppression, privacy protection and content development, and explain what each step is expected to accomplish.',
  },
  {
    title: 'Execution & monitoring',
    summary: 'We do the work, report progress in plain English and keep watch for anything new.',
    detail:
      'We carry out the plan, follow up persistently with websites and search engines, and send you regular progress updates. Monitoring continues so we can respond quickly if content resurfaces.',
  },
] as const;
