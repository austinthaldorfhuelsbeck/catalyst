import { defineLocations, defineDocuments, PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Blog', href: `/posts` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == 'page' && slug.current == 'index'`,
    },
    {
      route: '/:slug',
      filter: `_type == 'page' && slug.current == $slug`,
    },
    {
      route: '/posts',
      filter: `_type == 'post'`,
    },
    {
      route: '/posts/:slug',
      filter: `_type == 'post' && slug.current == $slug`,
    },
    {
      route: '/projects',
      filter: `_type == 'project'`,
    },
    {
      route: '/projects/:slug',
      filter: `_type == 'project' && slug.current == $slug`,
    },
    {
      route: '/events',
      filter: `_type == 'event'`,
    },
    {
      route: '/events/:slug',
      filter: `_type == 'event' && slug.current == $slug`,
    },
    {
      route: '/tags',
      filter: `_type == 'tag'`,
    },
    {
      route: '/tags/:slug',
      filter: `_type == 'tag' && slug.current == $slug`,
    },
  ]),
};
