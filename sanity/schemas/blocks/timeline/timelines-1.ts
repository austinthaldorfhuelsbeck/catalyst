import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'timelines-1',
  type: 'object',
  title: 'Timelines 1',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title of the timeline section',
    }),
    defineField({
      name: 'tagLine',
      title: 'Tag Line',
      description:
        'A short tag line to display under the title, e.g. date, location, job title, etc.',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'block-content',
      description: 'Additional paragraph body of the timeline section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
