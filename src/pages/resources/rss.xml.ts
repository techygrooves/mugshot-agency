import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '@config/site';

export const GET: APIRoute = async (context) => {
  const articles = (await getCollection('resources')).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: `${site.name} — Resources`,
    description: 'Guides to removing mugshots, cleaning up search results and protecting your personal information online.',
    site: context.site ?? site.url,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishedAt,
      link: `/resources/${a.id}/`,
    })),
  });
};
