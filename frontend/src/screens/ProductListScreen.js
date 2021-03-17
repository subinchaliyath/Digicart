import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts,deleteProduct, createProducts } from "../actions/productActions";
import { PRODUCT_CREATE_PRESET } from "../constants/productConstants";
import { Paginator } from "../components/Paginator";

const ProductListScreen = ({ history, match }) => {
  const pageNumber= match.params.pageNumber
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, pageNum} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {  error:errorDelete, success:successDelete } = productDelete;
  
  const productCreate = useSelector((state) => state.productCreate);
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({type:PRODUCT_CREATE_PRESET})

    if (!userInfo.isAdmin) {
        history.push("/login");
    } 
    if(successCreate){
      console.log("here");
        history.push(`/admin/product/${createProduct._id}/edit`)
    }else{

        dispatch(listProducts('',pageNumber));
    }
    
  }, [dispatch, history, userInfo,successDelete, successCreate, createProduct,pageNumber]);
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
    handleClose()
  };
  const createProductHandler=()=>{
    dispatch(createProducts())
  }
  const [showModal, setShow] = useState(false);
  const [uid, setID] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };
  return (
    <>
    <Row className='align-items-center'>
<Col>
<h1>Products</h1>
</Col>
<Col className='text-right'>
<Button className='my-3' onClick={createProductHandler}>
   <i className='fas fa-plus'></i> Add Product
</Button>
</Col>
    </Row>
    {loadingCreate && <Loader/>}
    {errorDelete && <Message>{errorDelete}</Message>}
    {errorCreate && <Message>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.price}
                  </td>
                  <td>
                    {product.brand}
                  </td>
                  <td>
                    {product.category}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleShow(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Paginator pages={pages} pageNumber={pageNum} isAdmin={true}/>
        </>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteHandler(uid)}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductListScreen;
