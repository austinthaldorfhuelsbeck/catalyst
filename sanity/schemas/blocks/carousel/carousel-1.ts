import { defineField, defineType } from 'sanity';
import { GalleryHorizontal } from 'lucide-react';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'carousel-1',
  type: 'object',
  title: 'Carousel 1',
  icon: GalleryHorizontal,
  description: 'A carousel of images',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    ...stylingFields,
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          { title: 'One', value: 'one' },
          { title: 'Two', value: 'two' },
          { title: 'Three', value: 'three' },
        ],
        layout: 'radio',
      },
      initialValue: 'one',
      description: 'Choose the number of slides to display at once',
      group: 'settings',
    }),
    defineField({
      name: 'indicators',
      type: 'string',
      title: 'Slide Indicators',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Dots', value: 'dots' },
          { title: 'Count', value: 'count' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Choose how to indicate carousel progress and position',
      group: 'settings',
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
      description: 'Add images to the carousel',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'images.0.alt',
    },
    prepare({ title }) {
      return {
        title: 'Carousel',
        subtitle: title,
      };
    },
  },
});
