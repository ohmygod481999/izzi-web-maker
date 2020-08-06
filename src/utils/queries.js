import { gql } from "@apollo/client";
import Config from "./config";

export class QueryMulti {
    constructor(name, params, items) {
        this.name = name;
        this.params = params;
        this.items = items;
    }

    getQueryMulti = () => getQueryMulti(this.name, this.params, this.items);

    getItems = (result) => result[this.name].items;
}

export class QuerySingle {
    constructor(name, id, params, items) {
        this.name = name;
        this.id = id;
        this.params = params;
        this.items = items;
    }

    getQuerySingle = () =>
        getQuerySingle(this.name, this.id, this.params, this.items);

    getItem = (result) => result[this.name];
}

const getQueryMulti = (
    name = "users",
    params = {},
    items = ["id", "name"]
) => {
    return gql`
    query {
        ${name}(
            param: {
                keyword: "${params.keyword ? params.keyword : ""}", 
                limit: ${params.limit ? params.limit : 5}, 
                offset: ${params.offset ? params.offset : 0}, 
                order: "${params.order ? params.order : "desc"}", 
                sort: "${params.sort ? params.sort : "createdDate"}", 
                languageId: "${
                    params.languageId ? params.languageId : Config.languageId
                }", 
                merchantId: "${
                    params.merchantId ? params.merchantId : Config.merchantId
                }",
                ${params.themeWebId ? `themeWebId:"${params.themeWebId}"` : ""}
            }
        ) {
            totalCount
            message
            success
            items {
                ${items.reduce((acc, cur) => acc + "\n" + cur, "")}
            }
        }
    }
`;
};

const getQuerySingle = (
    name = "article",
    id,
    params = {},
    items = ["id", "name", "subDescription", "images {id, name}", "description"]
) => {
    return gql`
    query {
        ${name}(
            param: {
                id:"${id}",
                languageId: "${
                    params.languageId ? params.languageId : Config.languageId
                }", 
                merchantId: "${
                    params.merchantId ? params.merchantId : Config.merchantId
                }"
            }
        ) {
            ${items.reduce((acc, cur) => acc + "\n" + cur, "")}
        }
    }
`;
};
