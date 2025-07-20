import SectionContainer from '@/components/ui/section-container';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { fetchSanityPosts } from '@/sanity/lib/fetch';
import { PAGE_QUERYResult } from '@/sanity.types';
import GridPost from './grid/grid-post';

type AllPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'all-posts' }
>;

export default async function AllPosts({ padding, colorVariant }: AllPostsProps) {
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityPosts();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <GridPost key={post?.slug?.current} post={post} />
        ))}
      </div>
    </SectionContainer>
  );
}
