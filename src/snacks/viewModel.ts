/* eslint-disable prettier/prettier */
export class viewModel {
  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    img: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    // eslint-disable-next-line prettier/prettier
    this.price = price;
    // eslint-disable-next-line prettier/prettier
    this.img = img;
  }

  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
}
