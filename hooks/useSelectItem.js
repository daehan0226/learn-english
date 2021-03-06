import { useState, useEffect } from "react";

const useSelectItem = (data, sortKey) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setItems([...data]);
    }
  }, []);

  return {
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    sortKey,
  };
};

export default useSelectItem;
