import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphClient = new ApolloClient({
  uri: process.env.GRAPHCMS_KEY as string,
  cache: new InMemoryCache(),
});
