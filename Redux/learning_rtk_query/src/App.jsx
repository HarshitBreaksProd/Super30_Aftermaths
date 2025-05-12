import React from "react";
import AllProducts from "./components/AllProducts";
import SepcificProduct from "./components/SpecificProduct";
import AddNewProduct from "./components/AddNewProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";

const App = () => {
  return (
    <div>
      {/* <AllProducts /> */}
      {/* <SepcificProduct /> */}
      {/* <AddNewProduct /> */}
      {/* <UpdateProduct productId={4} /> */}
      <DeleteProduct productId={4} />
    </div>
  );
};

export default App;
