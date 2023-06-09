import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getStaticPaths, getStaticProps } from '@/feature/post/hooks/useGetPost';
import type { Post, Category } from '@/types/post';
import Layout from '@/components/Layout';
import Inner from '@/components/Inner';
import PublishDate from '@/components/PublishDate';
import UpdateDate from '@/components/UpdateDate';
import { PostCategory } from '@/components/PostCategory';

type Props = {
  post: Post;
  prevPost: {
    title: string;
    link: string;
  };
  nextPost: {
    title: string;
    link: string;
  };
};

const PostPage = ({ post, prevPost, nextPost }: Props) => {
  return (
    <Layout>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: `${post.title}`,
          description: `${post.description}`,
        }}
      />
      <Inner className='grid h-full grid-rows-[1fr,auto] gap-20'>
        <article className='mt-10'>
          <div className='flex items-center gap-4'>
            {post.publishedAt === post.updatedAt ? (
              <PublishDate date={post.publishedAt} />
            ) : (
              <>
                <PublishDate date={post.publishedAt} />
                <UpdateDate date={post.updatedAt} />
              </>
            )}
          </div>
          <h1 className='mt-4 text-2xl font-bold leading-normal'>{post.title}</h1>
          {post.category.length > 0 && (
            <div className='mt-4 flex flex-wrap items-center gap-2'>
              {post.category.map((category) => (
                <PostCategory key={category.id} name={category.name} />
              ))}
            </div>
          )}
          <div
            className='single mt-8 border-t-2 border-solid border-body-black pt-8 dark:border-secondary-900'
            dangerouslySetInnerHTML={{
              __html: `${post.body}`,
            }}
          />
        </article>
        <div
          className={`flex gap-10 ${!nextPost ? 'justify-end' : ''}${
            !prevPost ? 'justify-start' : ''
          }${prevPost && nextPost ? 'justify-between' : ''}`}
        >
          {nextPost && (
            <Link
              href={nextPost.link}
              className="inline-flex items-center gap-2 underline transition-opacity before:h-2 before:w-2 before:shrink-0 before:rotate-[-45deg] before:border-l-2 before:border-t-2 before:border-solid before:border-current before:content-[''] hover:opacity-60"
            >
              {nextPost.title}
            </Link>
          )}
          {prevPost && (
            <Link
              href={prevPost.link}
              className="inline-flex items-center gap-2 underline transition-opacity after:h-2 after:w-2 after:shrink-0 after:rotate-[135deg] after:border-l-2 after:border-t-2 after:border-solid after:border-current after:content-[''] hover:opacity-60"
            >
              {prevPost.title}
            </Link>
          )}
        </div>
      </Inner>
    </Layout>
  );
};

export default PostPage;
export { getStaticProps, getStaticPaths };
