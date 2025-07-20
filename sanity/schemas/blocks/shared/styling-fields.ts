import { defineField } from 'sanity';
import { SECTION_WIDTH, STACK_ALIGN } from './layout-variants';

export const stylingFields = [
  defineField({
    name: 'padding',
    type: 'section-padding',
    title: 'Padding',
    description: 'Add padding to the top or bottom of the section',
    group: 'styling',
  }),
  defineField({
    name: 'colorVariant',
    type: 'color-variant',
    title: 'Color Variant',
    description: 'Select a background color variant',
    group: 'styling',
  }),
  defineField({
    name: 'sectionWidth',
    type: 'string',
    title: 'Section Width',
    options: {
      list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
      layout: 'radio',
    },
    initialValue: 'default',
    description: 'Choose the width of the section',
    group: 'styling',
  }),
  defineField({
    name: 'stackAlign',
    type: 'string',
    title: 'Stack Alignment',
    options: {
      list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
      layout: 'radio',
    },
    initialValue: 'left',
    description: 'Choose the alignment of the stacked items in the section',
    group: 'styling',
  }),
];
