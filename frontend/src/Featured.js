import { useProductContext } from "./context/productContext";
import Product from "./Product";
const Featured = () => {
  const { isLoading, products } = useProductContext();
  console.log("product list", products);

  if (isLoading) {
    return <div>....Loading</div>;
  }

  return (
    <>
      FeaturedProduct
      <div>
        {products?.map((curElm) => {
          return <Product key={curElm._id} {...curElm} />;
        })}
      </div>
    </>
  );
};

export default Featured;
