import { defineField, defineType } from 'sanity';
import { TextQuote } from 'lucide-react';

export default defineType({
  name: 'split-content',
  type: 'object',
  icon: TextQuote,
  title: 'Split Content',
  description: 'Column with tag line, title and content body.',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    defineField({
      name: 'sticky',
      type: 'boolean',
      description: 'Sticky column on desktop',
      initialValue: false,
      group: 'styling',
    }),
    defineField({
      name: 'padding',
      type: 'section-padding',
      description: 'Add padding to the top or bottom of the section',
      group: 'styling',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      description: 'Select a background color variant',
      group: 'styling',
    }),
    defineField({
      name: 'tagLine',
      type: 'string',
      description: 'Small text below the title',
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Main text of the split content',
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      description: 'Additional body text of the split content',
      group: 'content',
    }),
    defineField({
      name: 'link',
      type: 'link',
      description: 'Link to a page or external URL. Leave empty to hide the link.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'No Title',
      };
    },
  },
});
