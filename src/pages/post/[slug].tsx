import { gql } from '@apollo/client';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BsPerson } from 'react-icons/bs';
import { FiCalendar, FiClock } from 'react-icons/fi';
import Header from '../../components/Header';
import { formatDate } from '../../services/formatDate';
import { graphClient } from '../../services/graph';
import { ISpacetraveling } from '../../services/ISpacetraveling';
import styles from './post.module.scss';

export default function Post({ spacetraveling }: ISpacetraveling): JSX.Element {
  return (
    <>
      <Head>
        <title>spacetraveling. | Criando um app CRA do zero</title>
      </Head>

      <main className={styles.postContainer}>
        <header>
          <Header />
        </header>

        {spacetraveling.banner ? (
          <picture>
            <img
              src={spacetraveling.banner?.url}
              alt={spacetraveling.title}
              className={styles.postBanner}
            />
          </picture>
        ) : (
          ''
        )}

        <section className={styles.postContent}>
          <div>
            <h1>{spacetraveling.title}</h1>
            <div className={styles.postContentInfo}>
              <time>
                <FiCalendar size={20} /> {formatDate(spacetraveling.time)}
              </time>
              <span>
                <BsPerson size={20} /> {spacetraveling.author}
              </span>
              <time>
                <FiClock size={20} />
                {formatDistanceToNow(parseISO(spacetraveling.time), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </time>
            </div>
          </div>

          {spacetraveling.content.map(item => {
            return (
              <div key={item.id} className={styles.postHtmlDiv}>
                <h2>{item.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: item?.body?.html }}
                  className={styles.postHtml}
                />
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const GET_POST_QUERY = gql`
    query MyQuery($slug: String) {
      spacetraveling(where: { slug: $slug }) {
        id
        slug
        title
        time
        subtitle
        createdAt
        author
        content {
          ... on Content {
            id
            heading
            body {
              html
            }
          }
        }
        banner {
          url
        }
      }
    }
  `;

  const { slug } = params;

  const res = await graphClient.query({
    query: GET_POST_QUERY,
    variables: {
      slug,
    },
  });

  const { spacetraveling } = res.data;

  return {
    props: {
      spacetraveling,
    },
  };
};
