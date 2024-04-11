import React, { useState, useEffect } from "react";
import Cards from "../Components/Cards";
import { list } from "../data";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../context/cartcontext";


function Details() {
  //{ handleClick }: DetailsProps
  const {handleClick}=useCart();
  const [category, setCategory] = useState(list);
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState<string[]>([]); // State to store unique categories

  useEffect(() => {
    // Extract unique categories from the data
    const uniqueCategoriesSet = new Set<string>();
    list.forEach((item) => uniqueCategoriesSet.add(item.kind));
    const uniqueCategories = ["All", ...Array.from(uniqueCategoriesSet)];
    setCategories(uniqueCategories);
  }, []);

  // Search functionality
  const [query, setQuery] = useState("");

  const handleBtns = (word: string) => {
    if (word === "All") {
      setCategory(list);
    } else {
      const filtered = list.filter((item) => item.kind === word);
      setCategory(filtered);
    }

    setActiveTab(word);
  };

  return (
    <>
      <section className="container pt-4 mx-auto w-full bg-bgColor">
        <section className="px-6 flex flex-row justify-between">
          <div className="relative w-80 h-11 mt-4 ">
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full h-full py-4 px-10 text-base text-black rounded-lg outline-none border-2"
              placeholder="Search food..."
            />
            <i>
              <FaSearch className="absolute left-4 top-4 text-lg w-4 h-4 text-center text-black focus:outline-none" />
            </i>
          </div>

          <div className="flex flex-wrap mt-4 lg:mb-4 mb-8">
            {/* Render buttons dynamically based on categories */}
            {categories.map((category, index) => (
              <button
                key={index}
                value={category}
                onClick={() => handleBtns(category)}
                className={`mr-2 text-brandColor border-brandColor border-2 py-1 px-6  h-10 rounded-lg text-lg ${
                  activeTab === category
                    ? "bg-brandColor outline-none text-white"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-row flex-wrap">
          {category
            .filter((title) => {
              if (query === "") {
                return title;
              } else if (
                title.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return title;
              }
            })
            .map((item) => (
              <Cards key={item.id} item={item} handleClick={handleClick} />
            ))}
        </section>
      
      </section>
    </>
  );
}

export default Details;
