import React from "react";
import { useAddNewProductMutation } from "../app/service/dummyData";

const AddNewProduct = () => {
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();

  const handleAddProduct = async () => {
    try {
      const newProdData = {
        id: 1,
        title: "Amazing T-Shirt",
        description: "This is one of the amazing T-Shirts",
      };

      const res = await addNewProduct(newProdData);
      console.log(res);
    } catch (err) {
      console.log("Oh Oh! Error");
    }
  };

  if (isError) {
    return <h1>Oh Noooooooo! We have an error</h1>;
  } else if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>{data?.id}</h1>
        <h1>{data?.title}</h1>
        <h1>{data?.description}</h1>

        <button onClick={handleAddProduct} disabled={isLoading}>
          Add New Product
        </button>
      </div>
    );
  }
};

export default AddNewProduct;
