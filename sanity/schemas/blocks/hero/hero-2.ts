import { defineField, defineType } from 'sanity';
import { LayoutTemplate } from 'lucide-react';

export default defineType({
  name: 'hero-2',
  title: 'Hero 2',
  type: 'object',
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: 'tagLine',
      type: 'string',
      description: 'Small text above the title',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Main text of the hero',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      description: 'Additional body text of the hero',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (rule) => rule.max(2),
      description: 'Add links to the hero',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Hero 2',
        subtitle: title,
      };
    },
  },
});
