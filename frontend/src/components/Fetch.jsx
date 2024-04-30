import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/product");
    const products = await data.json();
    console.log(products);
    setProduct(products);
  };
  return <div>{product.map((p) => p.title)}</div>;
};

export default Fetch;
