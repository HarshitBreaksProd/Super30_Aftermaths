import React from "react";
import { useGetAllProductsQuery } from "../app/service/dummyData";

const AllProducts = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery({});

  if (isError) {
    return <h1>Oh Noooooooo! We have an error</h1>;
  } else if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Products:</h1>
        {data?.products.map((p) => {
          return (
            <>
              <h3 key={p.id}>{p.title}</h3>
              <p>{p.description}</p>
            </>
          );
        })}
      </div>
    );
  }
};

export default AllProducts;
