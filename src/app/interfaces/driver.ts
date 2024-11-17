
export interface Driver {
    id: string;
    orderId: any;
    drivername: string;
    Orders: any[];
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;  
    };
    items: {
        productId: unknown;
        quantity: number;
        length: number;
      };
    orderNumber: number;
    status: string;
    location:{
        lat:any; 
        long:any;
      } 

}
