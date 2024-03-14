import { ProductCard } from '../ProductCard/ProductCard';
import { IProduct } from '../../models/IProduct';

interface IProductCardsProps {
  products: IProduct[];
}

export const ProductCards = ({ products }: IProductCardsProps) => {
  return (
    <>
      <div className="product-cards">
        <article className="">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </article>
      </div>
    </>
  );
};
