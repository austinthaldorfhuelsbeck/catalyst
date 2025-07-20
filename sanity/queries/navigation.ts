import { groq } from 'next-sanity';

const navItemFragment = `
  _key,
  title,
  page->{
    _id,
    title,
    slug{
      current
    }
  },
  hideFromHeader,
  hideFromFooter
`;

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"]{
    _type,
    _key,
    navItems[]{
      ${navItemFragment},
      subMenu[]{
        ${navItemFragment}
      }
    },
  }
`;
