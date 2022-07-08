import { gql } from '@apollo/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BsPerson } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import Header from '../components/Header';
import { formatDate } from '../services/formatDate';
import { graphClient } from '../services/graph';
import styles from './home.module.scss';

interface HomeProps {
  spacetravelings: {
    author: string;
    id: string;
    slug: string;
    subtitle: string;
    time: string;
    title: string;
  }[];
}

export default function Home({ spacetravelings }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>spacetraveling.</title>
      </Head>

      <main className={styles.homeContainer}>
        <Header />

        {spacetravelings.map(item => {
          return (
            <section
              key={item.id}
              title={`Ir até "${item.title}"`}
              className={styles.homeContent}
            >
              <Link href={`/post/${item.slug}`}>
                <a>
                  <h1>{item.title}</h1>
                  <p>{item.subtitle}</p>
                </a>
              </Link>
              <div className={styles.homeTimeAndAuthorInfo}>
                <time>
                  <FiCalendar size={20} />
                  {formatDate(item.time)}
                </time>
                <span>
                  <BsPerson size={20} /> {item.author}
                </span>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const GET_POSTS_QUERY = gql`
    query GetPosts {
      spacetravelings {
        id
        title
        time
        subtitle
        author
        slug
      }
    }
  `;

  const res = await graphClient.query({
    query: GET_POSTS_QUERY,
  });

  const { spacetravelings } = res.data;

  return {
    props: {
      spacetravelings,
    },
    revalidate: 60 * 60 * 24, // 24hours
  };
};
