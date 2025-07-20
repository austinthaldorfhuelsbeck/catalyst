import { defineField, defineType } from 'sanity';
import { WalletCards } from 'lucide-react';

export default defineType({
  name: 'pricing-card',
  type: 'object',
  icon: WalletCards,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title of the pricing card',
    }),
    defineField({
      name: 'tagLine',
      type: 'string',
      description: 'Small text below the title',
    }),
    defineField({
      name: 'price',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          type: 'number',
          description: 'Price of the card',
        }),
        defineField({
          name: 'period',
          type: 'string',
          description: 'Period of the price',
        }),
      ],
    }),
    defineField({
      name: 'list',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features for the card',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      description: 'Short description of the card',
    }),
    defineField({
      name: 'link',
      type: 'link',
      description: 'Link to the product',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price.value',
      period: 'price.period',
    },
    prepare({ title, price, period }) {
      return {
        title: 'Pricing Card',
        subtitle: `${title}: ${price}${period}`,
      };
    },
  },
});
