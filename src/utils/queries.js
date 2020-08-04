import { gql } from "@apollo/client";
import Config from "./config";

const queries = {
    article: (options) => {
        if (!options) options = {};
        const { limit, offset, order, sort } = options;
        return gql`
        query {
            articles(
                param: {
                    type: 0
                    keyword: ""
                    limit: ${limit ? limit : 5}
                    offset: ${offset ? offset : 0}
                    order: ${order ? order : "desc"}
                    sort: ${sort ? sort : "createdDate"}
                    languageId: "${Config.languageId}"
                    merchantId: "${Config.merchantId}"
                }
            ) {
                totalCount
                message
                success
                items {
                    id
                    name
                    subDescription
                    description
                    categories {
                        id
                        name
                    }
                    images {
                        id
                        path
                    }
                    createdDate
                    published
                }
            }
        }
    `;
    },
};

export default queries;
