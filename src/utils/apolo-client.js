import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://apicms.izzi.asia/graphql/",
    cache: new InMemoryCache(),
});
