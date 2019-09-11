import { IProducts } from '../interfaces/products.interface';

export class Products implements IProducts{
    constructor(
        public id: number,
        public category: string,
        public name: string,
        public description: string,
        public price: number,
        public image: string
    ){}
}