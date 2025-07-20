import { defineType, defineField } from 'sanity';
import { ListCollapse } from 'lucide-react';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'object',
  icon: ListCollapse,
  description: 'A list of frequently asked questions',
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
    ...stylingFields,
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        {
          name: 'faq',
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'faqs.0.title',
    },
    prepare({ title }) {
      return {
        title: 'FAQs',
        subtitle: title || 'No Title',
      };
    },
  },
});
