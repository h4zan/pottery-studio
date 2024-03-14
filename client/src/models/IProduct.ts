export interface IProduct {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    isNew: boolean;
    types: string;
    quantity?: number;
    categories: {
      data: ICategory[];
    };
    collections: {
      data: ICollection[];
    };
    firstImg: IImage;
    secondImg?: IImage;
  };
}

export interface IImage {
  data: {
    attributes: {
      alternativeText: string;
      url: string;
    };
  };
}

export interface ICategory {
  id: number;
  attributes: {
    title: string;
  };
}

export interface ICollection {
  id: number;
  attributes: {
    title: string;
    desc: string;
  };
}
export const initialProduct: IProduct = {
  id: 0,
  attributes: {
    name: '',
    description: '',
    price: 0,
    isNew: false,
    types: '',
    quantity: 0,
    categories: { data: [] },
    collections: { data: [] },
    firstImg: { data: { attributes: { alternativeText: '', url: '' } } },
  },
};

export const initialCollection: ICollection = {
  id: 0,
  attributes: {
    title: '',
    desc: '',
  },
};
