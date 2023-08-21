export class Product {
  idProduct: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  weight: number;
  onStock: boolean;

  constructor() {
    this.idProduct = 0;
    this.name = '';
    this.price = 0;
    this.quantity = 0;
    this.category = '';
    this.weight = 0;
    this.onStock = false;
  }
}
