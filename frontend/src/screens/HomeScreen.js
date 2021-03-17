import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { Paginator } from "../components/Paginator";
import { Product } from "../components/Product";

export const HomeScreen = ({match}) => {
  const dispatch = useDispatch();
  const keyword= match.params.keyword || ''
  const pageNumber= match.params.pageNumber || 1

  const productList = useSelector((state) => state.productList);
  const { products, error, loading ,pages, pageNumber:pageNum} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel/>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            );
          })}
        </Row>
        <Paginator pages={pages} pageNumber={pageNum} keyword={keyword}/>
        </>
      )}
    </>
  );
};
