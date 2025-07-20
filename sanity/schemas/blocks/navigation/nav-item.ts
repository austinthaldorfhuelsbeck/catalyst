import { defineField, defineType } from 'sanity';
import { LetterText } from 'lucide-react';

export default defineType({
  name: 'nav-item',
  title: 'Navigation Item',
  type: 'object',
  icon: LetterText,
  description: 'A navigation item for the header or footer',
  fields: [
    defineField({
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'The page to link to',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Custom title for navigation item (required if no page is selected)',
      validation: (Rule) => Rule.custom((title, context) => {
        const page = (context.parent as any)?.page;
        if (!page && !title) {
          return 'Title is required when no page is selected';
        }
        return true;
      }),
    }),
    defineField({
      name: 'hideFromHeader',
      type: 'boolean',
      title: 'Hide from header',
      description: 'Hide this navigation item from the header',
      initialValue: false,
    }),
    defineField({
      name: 'hideFromFooter',
      type: 'boolean',
      title: 'Hide from footer',
      description: 'Hide this navigation item from the footer',
      initialValue: false,
    }),
    defineField({
      name: 'subMenu',
      type: 'array',
      of: [{ type: 'nav-item' }],
      title: 'Sub menu',
      description: 'A sub menu for this navigation item',
    }),
  ],
  preview: {
    select: {
      pageTitle: 'page.title',
      customTitle: 'title',
      subtitle: 'page.slug.current',
    },
    prepare({ pageTitle, customTitle, subtitle }) {
      return {
        title: pageTitle || customTitle || 'No Title',
        subtitle: subtitle ? `/${subtitle}` : customTitle ? 'No URL (Custom Title)' : 'No URL',
      };
    },
  },
});
