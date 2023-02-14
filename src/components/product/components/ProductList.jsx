import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <>
      <div className=" filter-box">
        <div className="col-4 col-sm-12 ">
          <p style={{ fontSize: "15px" }}>
            <b style={{ paddingRight: "5px" }}>{filteredProducts.length}</b>sản
            phẩm
          </p>
        </div>
        <div className="col-4 col-sm-12 ">
          <div className="search-filter">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-4 col-sm-12 ">
          <div className="filter-sort">
            <label>Sắp xếp theo:</label>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Mới nhất</option>
              <option value="lowest-price">Giá từ thấp - cao</option>
              <option value="highest-price">Giá từ cao - thấp</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row" id="products">
        {products.length === 0 ? (
          <p>Không có sản phẩm nào</p>
        ) : (
          <>
            {currentProducts.map((product, id) => {
              return (
                <ProductItem key={product.id} {...product} product={product} />
              );
            })}
          </>
        )}
      </div>
      <div>
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};

export default ProductList;
