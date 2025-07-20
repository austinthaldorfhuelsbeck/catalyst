import { defineField, defineType } from 'sanity';
import { LetterText } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';
import { stylingFields } from './shared/styling-fields';

export default defineType({
  name: 'section-header',
  title: 'Section Header',
  type: 'object',
  icon: LetterText,
  description: 'A section header with a tag line, title, and description',
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
      description: 'Main text of the section header',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      description: 'Additional text of the section header',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Section Header',
        subtitle: title,
      };
    },
  },
});
