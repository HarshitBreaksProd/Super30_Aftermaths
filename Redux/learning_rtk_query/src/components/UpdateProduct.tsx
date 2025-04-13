import React from "react";
import { useUpdateProductByIdMutation } from "../app/service/dummyData";

const UpdateProduct = ({ productId }) => {
  const [updateProduct, { data, error, isLoading }] =
    useUpdateProductByIdMutation();

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        title: "New Title",
      };

      const res = await updateProduct({
        id: productId,
        updatedProduct: updatedProductData,
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    console.error(error);
  } else if (isLoading) {
    <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>{data?.title}</h1>

        <button onClick={handleUpdateProduct} disabled={isLoading}>
          Update Product
        </button>
      </div>
    );
  }
};

export default UpdateProduct;
