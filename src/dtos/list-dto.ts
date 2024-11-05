export interface TransactionDTO {
    id: number;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      username: string;
      email: string;
    };
    cart: {
      cartItems: {
        product: {
          productName: string;
          price: number;
        };
        qty: number;
      }[];
    };
  }
  