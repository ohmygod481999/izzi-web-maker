import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://apicms.izzi.asia/graphql/",
    cache: new InMemoryCache(),
});

export default function longQuery() {
    client
        .query({
            query: gql`
                query {
                    articles(param:{type:0,keyword:"",limit:5,offset:0,order:"desc",sort:"createdDate"
                        ,languageId:"838aef56-78bb-11e6-b5a6-00155d582814",merchantId:"ce5cb104-e000-46f2-9dce-8019f38b3a5c", , })
                    {
                        totalCount,
                        message, 
                        success,
                        items{
                                id,
                                name,
                                subDescription,
                                description,
                                categories {
                                    id,
                                    name
                                },
                                images {
                                    id, 
                                    path
                                },
                                createdDate,
                                published
                        },
                        
                    }
                  }
            `,
        })
        .then((result) => console.log(result.data.articles.items));
}
