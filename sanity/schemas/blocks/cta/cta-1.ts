import { defineField, defineType } from 'sanity';
import { Captions } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';
import { stylingFields } from '../shared/styling-fields';

export default defineType({
  name: 'cta-1',
  title: 'CTA 1',
  type: 'object',
  icon: Captions,
  description: 'A call to action',
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
      name: 'tagLine',
      type: 'string',
      description: 'Small text above the title',
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Main text of the call to action',
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'block-content',
      description: 'Additional body text of the call to action',
      group: 'content',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (rule) => rule.max(2),
      description: 'Add links to the call to action',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'CTA 1',
        subtitle: title,
      };
    },
  },
});
