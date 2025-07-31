import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/queries/page';
import { NAVIGATION_QUERY } from '@/sanity/queries/navigation';
import { SETTINGS_QUERY } from '@/sanity/queries/settings';
import { POST_QUERY, POSTS_QUERY, POSTS_SLUGS_QUERY } from '@/sanity/queries/post';
import {
  EVENT_CATEGORY_QUERY,
  EVENT_CATEGORIES_QUERY,
  EVENT_CATEGORIES_SLUGS_QUERY,
} from '@/sanity/queries/event-category';
import {
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
  POSTS_SLUGS_QUERYResult,
  NAVIGATION_QUERYResult,
  SETTINGS_QUERYResult,
  TAG_QUERYResult,
  TAGS_QUERYResult,
  TAGS_SLUGS_QUERYResult,
  PROJECTS_QUERYResult,
  PROJECT_QUERYResult,
  PROJECTS_SLUGS_QUERYResult,
  EVENT_CATEGORIES_QUERYResult,
  EVENT_CATEGORY_QUERYResult,
  EVENT_CATEGORIES_SLUGS_QUERYResult,
  EVENT_QUERYResult,
  EVENTS_QUERYResult,
  EVENTS_SLUGS_QUERYResult,
} from '@/sanity.types';
import { TAG_QUERY, TAGS_QUERY, TAGS_SLUGS_QUERY } from '@/sanity/queries/tag';
import { PROJECT_QUERY, PROJECTS_QUERY, PROJECTS_SLUGS_QUERY } from '@/sanity/queries/project';
import { EVENTS_QUERY, EVENT_QUERY, EVENTS_SLUGS_QUERY } from '@/sanity/queries/event';

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams = async (): Promise<PAGES_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export const fetchSanityPosts = async (): Promise<POSTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPostsStaticParams = async (): Promise<POSTS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export const fetchSanityProjects = async (): Promise<PROJECTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  console.log('All projects', data);
  return data;
};

export const fetchSanityProjectBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PROJECT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProjectsStaticParams = async (): Promise<PROJECTS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PROJECTS_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export const fetchProjectNavigation = async (currentSlug: string) => {
  const projects = await fetchSanityProjects();
  const currentIndex = projects.findIndex((project) => project.slug?.current === currentSlug);

  if (currentIndex === -1) return { previous: null, next: null };

  const previous = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return { previous, next };
};

export const fetchSanityTags = async (): Promise<TAGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: TAGS_QUERY,
  });

  return data;
};

export const fetchSanityTagBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<TAG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: TAG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityTagsStaticParams = async (): Promise<TAGS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: TAGS_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export const fetchSanityEventCategories = async (): Promise<EVENT_CATEGORIES_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENT_CATEGORIES_QUERY,
  });

  return data;
};

export const fetchSanityEventCategoryBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<EVENT_CATEGORY_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENT_CATEGORY_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityEventCategoriesStaticParams =
  async (): Promise<EVENT_CATEGORIES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: EVENT_CATEGORIES_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityEvents = async (): Promise<EVENTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENTS_QUERY,
  });

  return data;
};

export const fetchSanityEventBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<EVENT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityEventsStaticParams = async (): Promise<EVENTS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENTS_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export const fetchSanityNavigation = async (): Promise<NAVIGATION_QUERYResult> => {
  const { data } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  return data;
};

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};
