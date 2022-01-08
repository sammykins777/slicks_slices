import React, { useState } from 'react';

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick state in here and not the lower leve hook
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
