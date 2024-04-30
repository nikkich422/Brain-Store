import React, { useEffect, useState } from "react";

const Post = () => {
  //   const [product, setProduct] = useState([]);

  const city = "Bhopal";
  const country = "India";
  const pincode = "462023";
  const mobile = 1234567890;
  const user_id = 123456789;
  const address_one = "Ashoka garden";
  const address_two = "Near waseem kirana store";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // console.log(name, price);
    let result = await fetch("http://localhost:3000/userAddress", {
      method: "post",
      body: JSON.stringify({
        city,
        country,
        pincode,
        mobile,
        user_id,
        address_one,
        address_two,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };
  return <div>Post</div>;
};

export default Post;
