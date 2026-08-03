export interface Product {
  id: number;
  name: string;
  length_inches: number;
}

export interface Brand {
  id: number;
  name: string;
  products: Product[];
}

export const hotdogs: Brand[] = [
  {
    id: 1,
    name: "Nathan's Famous",
    products: [
      {
        id: 101,
        name: "Skinless Beef Franks",
        length_inches: 6.5,
      },
      {
        id: 102,
        name: "Bun Length Franks",
        length_inches: 8.0,
      },
    ],
  },
  {
    id: 2,
    name: "Hebrew National",
    products: [
      {
        id: 201,
        name: "Beef Franks",
        length_inches: 6.0,
      },
    ],
  },
  {
    id: 3,
    name: "Oscar Mayer",
    products: [
      {
        id: 301,
        name: "Classic Beef Franks",
        length_inches: 5.5,
      },
    ],
  },

];
