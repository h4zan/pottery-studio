import { IProduct } from '../models/IProduct';

export interface IAction {
  type: IActionType;
  payload: string;
}

export enum IActionType {
  ADDED,
  UPPDATED,
  REMOVED,
  GETALL,
  CLICKED,
  SORTEDBYPRICE,
  SORTEDBYCATEGORY,
  SORTEDBYCOLLECTION,
}

export const ProductReducer = (
  products: IProduct[],
  action: IAction
): IProduct[] => {
  switch (action.type) {
    case IActionType.GETALL: {
      saveToLs(JSON.parse(action.payload));
      return JSON.parse(action.payload);
    }
    case IActionType.CLICKED: {
      const newState = products.map((product) => {
        if (product.id.toString() === action.payload) {
          return { ...product, clicked: product.id.toString() };
        } else {
          return product;
        }
      });
      saveToLs(newState);
      return newState;
    }
    case IActionType.SORTEDBYPRICE: {
      if (action.payload === 'reset') {
        const originalOrder = JSON.parse(
          localStorage.getItem('products') || '[]'
        );
        return originalOrder.length > 0 ? [...originalOrder] : products;
      } else {
        let sortedProducts: IProduct[];

        if (action.payload === 'asc') {
          sortedProducts = [...products].sort(
            (a, b) => a.attributes.price - b.attributes.price
          );
        } else if (action.payload === 'desc') {
          sortedProducts = [...products].sort(
            (a, b) => b.attributes.price - a.attributes.price
          );
        } else {
          return products;
        }

        return sortedProducts;
      }
    }

    case IActionType.SORTEDBYCATEGORY: {
      const categoryId = parseInt(action.payload);

      if (categoryId === -1) {
        const originalOrder = JSON.parse(
          localStorage.getItem('products') || '[]'
        );
        return originalOrder.length > 0 ? [...originalOrder] : products;
      }

      if (!categoryId) {
        return products;
      }

      const filteredProducts = products.filter((product) =>
        product.attributes.categories.data.some(
          (category) => category.id === categoryId
        )
      );

      return filteredProducts;
    }

    case IActionType.SORTEDBYCOLLECTION: {
      const collectionId = parseInt(action.payload);

      if (!collectionId) {
        return [...products];
      }

      const filteredProducts = products
        .map((product) => ({
          ...product,
          attributes: {
            ...product.attributes,
            collections: {
              ...product.attributes.collections,
              data: product.attributes.collections.data.filter(
                (collection) => collection.id === collectionId
              ),
            },
          },
        }))
        .filter((product) => product.attributes.collections.data.length > 0);

      return [...filteredProducts];
    }

    default:
      break;
  }

  return products;
};

const saveToLs = (products: IProduct[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};
