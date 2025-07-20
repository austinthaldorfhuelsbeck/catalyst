import { defineType, defineField } from 'sanity';
import { Images } from 'lucide-react';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'logo-cloud-1',
  type: 'object',
  icon: Images,
  description: 'A scrolling array of logo images',
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
      name: 'title',
      type: 'string',
      description: 'Title displayed above the logo cloud',
      group: 'content',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
      ],
      description: 'Add images to the logo cloud',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Logo Cloud',
        subtitle: title || 'No Title',
      };
    },
  },
});
