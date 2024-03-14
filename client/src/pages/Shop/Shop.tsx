import { useContext, useEffect, useState } from 'react';
import { ProductCards } from '../../components/ProductCards/ProductCards';
import { ProductsContext } from '../../contexts/ProductContext/ProductContext';
import { ICategory } from '../../models/IProduct';
import { PriceFilter } from '../../components/Filters/PriceFilter';
import { getCategories } from '../../services/strapiService';
import { CategoryFilter } from '../../components/Filters/CategoryFilter';

export const Shop = () => {
  const products = useContext(ProductsContext);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <article>
        <div className="products w-full mx-auto flex flex-row gap-3 justify-center md:justify-end">
          <div className="w-max">
            <CategoryFilter categories={categories} />
          </div>
          <div className="w-max md:mr-16 lg:mr-10 xl:mr-56">
            <PriceFilter />
          </div>
        </div>

        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {products.map((product) => (
            <ProductCards key={product.id} products={[product]} />
          ))}
        </section>
      </article>
    </>
  );
};
