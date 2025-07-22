import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString('en-US', options);
};

export const pluralize = (word: string): string => {
  const lowerWord = word.toLowerCase();

  // Words ending in s, ss, sh, ch, x, z -> add 'es'
  if (/[sxz]$|[cs]h$/.test(lowerWord)) {
    return word + 'es';
  }

  // Words ending in consonant + y -> change y to ies
  if (/[bcdfghjklmnpqrstvwxyz]y$/.test(lowerWord)) {
    return word.slice(0, -1) + 'ies';
  }

  // Words ending in vowel + y -> add s
  if (/[aeiou]y$/.test(lowerWord)) {
    return word + 's';
  }

  // Words ending in f or fe -> change to ves
  if (/fe?$/.test(lowerWord)) {
    // Some exceptions that just add 's'
    const fExceptions = ['roof', 'chief', 'chef', 'cliff', 'staff', 'proof', 'safe'];
    if (!fExceptions.includes(lowerWord)) {
      return word.replace(/fe?$/, 'ves');
    }
  }

  // Words ending in consonant + o -> add es
  if (/[bcdfghjklmnpqrstvwxyz]o$/.test(lowerWord)) {
    // Some common exceptions that just add 's'
    const oExceptions = ['photo', 'piano', 'halo', 'solo', 'memo', 'auto', 'pro'];
    if (!oExceptions.includes(lowerWord)) {
      return word + 'es';
    }
  }

  // Default: add 's'
  return word + 's';
};

// Define the types for block content and children
type Block = {
  _type: string;
  children?: Array<{ text: string }>;
};

type BlockContent = Block[] | null;

// Helper function to extract plain text from block content
export const extractPlainText = (blocks: BlockContent): string | null => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks
    .map((block) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children.map((child) => child.text).join('');
      }
      return '';
    })
    .join(' ');
};
