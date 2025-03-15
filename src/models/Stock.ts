interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    seil: number
}
export interface StockItem {
    id: number;
    product: Product;
    quantity: number;
    charity: number;

}