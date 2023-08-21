export class ProductBody {
  name: string;
  price: number;
  quantity: number;
  category: string;
  weight: number;
  onStock: boolean;

  constructor() {
    this.name = '';
    this.price = 0;
    this.quantity = 0;
    this.category = '';
    this.weight = 0;
    this.onStock = true;
  }
}
