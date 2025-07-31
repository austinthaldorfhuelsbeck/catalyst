import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';
import { metaFields } from '../blocks/shared/meta-fields';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'meta',
      title: 'Metadata',
    },
    {
      name: 'details',
      title: 'Details',
    },
    {
      name: 'tickets',
      title: 'Ticket Sales',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the event',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL slug for the event',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'The date of the event',
      type: 'datetime',
      group: 'details',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'event-category' }],
      group: 'details',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A preview of the event post',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'The full body of the post about the event',
      type: 'block-content',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      group: 'content',
    }),
    defineField({
      name: 'sellTickets',
      title: 'Sell Tickets',
      description: 'Enable ticket sales for this event',
      type: 'boolean',
      group: 'tickets',
      initialValue: false,
    }),
    defineField({
      name: 'ticketPrice',
      title: 'Ticket Price',
      description: 'Base price for tickets in USD',
      type: 'number',
      group: 'tickets',
      validation: (rule) =>
        rule.custom((value, context) => {
          const sellTickets = (context.document as any)?.sellTickets;
          if (sellTickets && (value === undefined || value <= 0)) {
            return 'Ticket price is required and must be greater than 0 when selling tickets';
          }
          return true;
        }),
      hidden: ({ document }) => !document?.sellTickets,
    }),
    defineField({
      name: 'saleEndDate',
      title: 'Sale End Date',
      description: 'When ticket sales end (defaults to event date)',
      type: 'datetime',
      group: 'tickets',
      validation: (rule) =>
        rule.custom((value, context) => {
          const sellTickets = (context.document as any)?.sellTickets;
          const eventDate = (context.document as any)?.date;
          if (sellTickets && !value) {
            return 'Sale end date is required when selling tickets';
          }
          if (value && eventDate && new Date(value) > new Date(eventDate)) {
            return 'Sale end date cannot be after the event date';
          }
          return true;
        }),
      hidden: ({ document }) => !document?.sellTickets,
    }),
    defineField({
      name: 'maxTickets',
      title: 'Maximum Tickets',
      description: 'Maximum number of tickets available (optional)',
      type: 'number',
      group: 'tickets',
      validation: (rule) => rule.min(1),
      hidden: ({ document }) => !document?.sellTickets,
    }),
    defineField({
      name: 'discountCodes',
      title: 'Discount Codes',
      type: 'array',
      group: 'tickets',
      of: [
        {
          type: 'object',
          name: 'discountCode',
          title: 'Discount Code',
          fields: [
            {
              name: 'code',
              title: 'Code',
              type: 'string',
              validation: (rule) => rule.required().min(3).max(20),
            },
            {
              name: 'discountAmount',
              title: 'Discount Amount',
              description: 'Amount to subtract from ticket price (in USD)',
              type: 'number',
              validation: (rule) => rule.required().min(0.01),
            },
          ],
          preview: {
            select: {
              code: 'code',
              discountAmount: 'discountAmount',
            },
            prepare: ({ code, discountAmount }) => ({
              title: code,
              subtitle: `$${discountAmount} off`,
            }),
          },
        },
      ],
      hidden: ({ document }) => !document?.sellTickets,
    }),
    ...metaFields,
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      sellTickets: 'sellTickets',
      ticketPrice: 'ticketPrice',
      media: 'image',
    },
    prepare(selection) {
      const { title, date, sellTickets, ticketPrice, media } = selection;
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      const priceStr = sellTickets && ticketPrice ? ` • $${ticketPrice}` : '';
      const ticketIcon = sellTickets ? '🎫 ' : '';

      return {
        title: `${ticketIcon}${title}`,
        subtitle: `${dateStr}${priceStr}`,
        media,
      };
    },
  },
});
