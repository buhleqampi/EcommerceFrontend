export interface Order {
isExpanded: any;
Orders: Order[];
cartId: string;
createdAt: any;
id: string;
description: string;
total: number;
userId: string;
shippingAddress: {
  address:String,
  coordinates:{
    lat:any,
    lng:any
  }
},
deliveryDetails:{
  DriverId: {
    type: String,
    // ref: 'Driver',
    required: true
  },
  coordinates:{
    lat: any,
    
    lng: any
    
  },
},
items: {
  productId: unknown;
  quantity: number;
  _id: any;
  length: number;
};
orderNumber: number;
status: any;
driverId: string;
location:{
  lat:any; 
  long:any;
} 
}
