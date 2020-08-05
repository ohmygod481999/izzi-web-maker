import React, { useEffect } from "react";
import longQuery from "../../../utils/apolo-client";
import { useQuery } from "@apollo/client";
import queries from "../../../utils/queries";

function Dashboard(props) {
    const { loading, error, data } = useQuery(queries.article());

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error)}</p>;

    // useEffect(() => {
    //     // longQuery();
    //     return () => {};
    // }, []);
    return <div>{JSON.stringify(data)}</div>;
}

export default Dashboard;
