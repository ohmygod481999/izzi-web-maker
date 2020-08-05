import React, { useEffect } from "react";
import longQuery from "../../../utils/apolo-client";
import { useQuery } from "@apollo/client";
import { QueryMulti, QuerySingle } from "../../../utils/queries";

function Dashboard(props) {
    const querySingle = new QuerySingle(
        "article",
        "0e694889-b854-a337-dc9e-5e3d547ac2e1"
    );
    const { loading, error, data } = useQuery(querySingle.getQuerySingle());

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;

    // useEffect(() => {
    //     // longQuery();
    //     return () => {};
    // }, []);
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: querySingle.getItem(data).description,
            }}
        >
            {/* {queryMulti.getItems(data).map((item) => (
                <p key={item.id}>{item.name}</p>
            ))} */}
        </div>
    );
}

export default Dashboard;
