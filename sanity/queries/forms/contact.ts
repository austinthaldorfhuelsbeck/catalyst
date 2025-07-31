import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const formContactQuery = groq`
  _type == "form-contact" => {
    _type,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    fields[]{
      name,
      placeholder,
      type,
      required
    },
    submitButtonText
  }
`;
