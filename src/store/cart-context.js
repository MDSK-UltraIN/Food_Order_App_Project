import React from 'react';

// 設定 Context 預設值
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => { },
  removeItem: (id) => { }
});

export default CartContext;