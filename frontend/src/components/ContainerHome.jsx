import React, { useState } from "react";
import StoreCardHome from "./StoreCardHome";
import { HomepageButton, products } from "../Utils/constants";

const ContainerHome = () => {
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState(products);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filteredData = products.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterData(filteredData);
  };

  const handleSearchBtn = () => {
    setSearchText("");
    if (searchText === "") {
      setFilterData(products);
    }
  };

  function compare(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }
  function compare2(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }
  function compare3(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  const handleSortSelect = (e) => {
    const target = e.target.value;
    if (target === "low to high") {
      const data = filterData.sort(compare);
      setFilterData([...data]);
    } else if (target === "high to low") {
      const data = filterData.sort(compare2);
      setFilterData([...data]);
    } else {
      const data = filterData.sort(compare3);
      setFilterData([...data]);
    }
  };

  const handlebtn1 = () => {
    const data = products.filter((d) => d.price <= 499);
    setFilterData(data);
  };

  const handlebtn2 = () => {
    const data = products.filter((d) => d.price >= 499 && d.price <= 999);
    setFilterData(data);
  };
  const handlebtn3 = () => {
    const data = products.filter((d) => d.price >= 999 && d.price <= 9999);
    setFilterData(data);
  };
  const handlebtn4 = () => {
    const data = products.filter((d) => d.price >= 9999);
    setFilterData(data);
  };
  const handleBtns = (e) => {
    // console.log(e?.target?.innerText, e?.target?.alt);
    const data = products.filter((p) =>
      p.category.toLowerCase() === e?.target?.innerText.toLowerCase()
        ? e?.target?.innerText.toLowerCase()
        : e?.taget?.alt.toLowerCase()
    );
    // console.log(data);
    setFilterData(data);
  };

  return (
    <div className="">
      <div className="bg-gray-100 pt-3 w-full flex flex-col">
        <div className="flex justify-center">
          <input
            className="px-2 py-2 m-2 w-2/3 rounded-full border border-black"
            type="text"
            value={searchText}
            placeholder="Type something for search..."
            onChange={handleSearch}
          />
          <button
            className="px-4 m-2 bg-black text-white rounded-full"
            onClick={handleSearchBtn}
          >
            Search
          </button>
        </div>
        <div className="flex justify-center flex-wrap">
          <div className="flex items-center">
            <h1 className="font-bold">Sort By Price</h1>
            <select
              onChange={(e) => handleSortSelect(e)}
              className="px-4 py-2 m-2 border border-gray-200 rounded-lg hover:cursor-pointer"
            >
              <option default>Default</option>
              <option value="low to high">Low To High</option>
              <option value="high to low">High To Low</option>
            </select>
          </div>

          <button
            className=" px-2 md:px-4 py-2 m-2 bg-gray-300 text-black rounded-lg font-semibold"
            onClick={handlebtn1}
          >
            Below 499
          </button>
          <button
            className="px-2 md:px-4 py-2 m-2 bg-gray-300 text-black rounded-lg font-semibold"
            onClick={handlebtn2}
          >
            500 - 999
          </button>
          <button
            className="md:inline-block hidden px-2 md:px-4 py-2 m-2 bg-gray-300 text-black rounded-lg font-semibold"
            onClick={handlebtn3}
          >
            1000 - 9999
          </button>
          <button
            className="px-2 md:px-4 py-2 m-2 bg-gray-300 text-black rounded-lg font-semibold"
            onClick={handlebtn4}
          >
            Above 9999
          </button>
        </div>
      </div>
      <div className="scroll mt-2 px-2 md:px-4 pb-2 overflow-x-auto flex flex-nowrap">
        {HomepageButton.map((btn) => (
          <div
            key={btn.title}
            className="flex jusify-center h-10 md:h-10 items-center border border-slate-500 px-1 md:px-2 rounded-full bg-white gap-2 mx-[1px]"
          >
            <div className="h-7 md:h-8 w-8 rounded-full flex justify-center items-center">
              <img className="h-7 w-7 p-1" src={btn.img_url} alt={btn.title} />
            </div>
            <div
              className="h-7 flex flex-nowrap justify-center items-center  hover:cursor-pointer"
              onClick={(e) => handleBtns(e)}
            >
              <h1 id="storeCardTitle" className=" py-4 text-nowrap">
                {btn.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4 ">
        {filterData.map((product) => (
          <StoreCardHome key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ContainerHome;
