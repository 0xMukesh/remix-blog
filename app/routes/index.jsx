import { Link, useLoaderData } from 'remix';
import * as cli from './posts/build-a-cli-using-nodejs.mdx';
import * as restapi from './posts/build-a-rest-api-using-nodejs.mdx';
import * as remixBlog from './posts/build-a-blog-using-remix-and-mdx.mdx';

function postFromModule(mod) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes.meta,
  };
}

export const loader = () => {
  return [
    postFromModule(cli),
    postFromModule(restapi),
    postFromModule(remixBlog),
  ];
};

export default function BlogIndex() {
  const posts = useLoaderData();
  return (
    <div className='prose lg:prose-xl py-10 pl-10'>
      <h2>Articles</h2>
      <div className='flex justify-center'>
        <ul>
          {posts.map((post) => (
            <li key={'posts/' + post.slug}>
              <Link to={'posts/' + post.slug}>{post.title}</Link>
              {post.description ? (
                <p className='m-0 lg:m-0'>{post.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
