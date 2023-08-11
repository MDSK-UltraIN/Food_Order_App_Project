import { useReducer } from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;


    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;


    if (existingCartItem) { // 若購物車內已有同樣商品，則增加 amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items]; // 複製既有 items 清單
      updatedItems[existingCartItemIndex] = updatedItem; // 更新已存在之item資料


    } else { // 若購物車內沒有已存在商品 
      updatedItems = state.items.concat(action.item);
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === 'REMOVE') {

  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item })

  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>)
}

export default CartProvider;