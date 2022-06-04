export interface IProduct {
    name: string;
    description: string;
    richDescription: string;
    image: string;
    brand: string;
    price: number;
    category: string;
    countInStock: number;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
}

export interface IProductImages extends IProduct {
    images: string[];
}