import React from "react";
import { useDeleteProductByIdMutation } from "../app/service/dummyData";

const DeleteProduct = ({ productId }) => {
  const [deleteProduct, { data, error, isLoading }] =
    useDeleteProductByIdMutation();

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productId);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    console.error(error);
  } else if (isLoading) {
    <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>{data?.title ? `${data?.title} is deleted` : ""}</h1>

        <button onClick={handleDeleteProduct} disabled={isLoading}>
          Delete Product
        </button>
      </div>
    );
  }
};

export default DeleteProduct;
