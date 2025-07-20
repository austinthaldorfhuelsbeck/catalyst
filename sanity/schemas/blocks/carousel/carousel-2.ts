import { defineField, defineType } from 'sanity';
import { Quote } from 'lucide-react';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'carousel-2',
  type: 'object',
  title: 'Carousel 2',
  icon: Quote,
  description: 'A carousel of testimonials',
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
      name: 'testimonial',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      description: 'Add testimonials to the carousel',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'testimonial.0.name',
    },
    prepare({ title }) {
      return {
        title: 'Testimonials Carousel',
        subtitle: title,
      };
    },
  },
});
