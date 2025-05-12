import React from "react";
import { useGetProductByIdQuery } from "../app/service/dummyData";

const SepcificProduct = () => {
  const { data, isError, isLoading } = useGetProductByIdQuery(4);

  if (isError) {
    return <h1>Oh Noooooooo! We have an error</h1>;
  } else if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Specific Product:</h1>
        <p>{data.title}</p>
      </div>
    );
  }

  return <div></div>;
};

export default SepcificProduct;
