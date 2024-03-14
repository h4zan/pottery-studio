import { useContext, useEffect, useState } from "react";
import headerImg from "../../assets/img/1chloe-bolton-R0qthXq3jec-unsplas.jpg";
import { CollectionCard } from "../../components/CollectionCard/CollectionCard";
import { ICollection } from "../../models/IProduct";
import { ProductsContext } from "../../contexts/ProductContext/ProductContext";
import { useLocation } from "react-router-dom";

export const Collections = () => {
  const products = useContext(ProductsContext);

  const [uniqueCollections, setUniqueCollections] = useState<ICollection[]>([]);
  const location = useLocation();

  useEffect(() => {
    const updatedUniqueCollections: ICollection[] = [];
    products.forEach((product) => {
      product.attributes.collections.data.forEach((collection) => {
        if (!updatedUniqueCollections.some((c) => c.id === collection.id)) {
          updatedUniqueCollections.push({ ...collection });
        }
      });
    });

    setUniqueCollections(updatedUniqueCollections);
  }, [products, location.pathname]);

  return (
    <>
      <div className="collections flex flex-col lg:h-[500px]">
        <section className="relative w-full mx-auto flex items-center overflow-hidden">
          <img
            src={headerImg}
            alt="Collection of colorful vases. Photo by Chloe Bolton from Unsplash"
            className="w-full h-auto object-cover"
          />
        </section>
      </div>

      {uniqueCollections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          products={products}
        />
      ))}
    </>
  );
};
