import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { CheckoutSteps } from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";


export const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const twoDecimals = (value) => {
    return +(Math.round(value * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = twoDecimals(
    +cart.cartItems.reduce((acc, each) => {
      return acc + each.qty * each.price;
    }, 0)
  );
  cart.shippingPrice = twoDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = twoDecimals(cart.itemsPrice * 0.15);
  cart.totalPrice = twoDecimals(
    cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  );

  const dispatch = useDispatch();
  
  
  const orderCreate=useSelector(state=>state.orderCreate)
  const {success,error}=orderCreate
  const placeHolderHandler = () => {
    let order = {
      orderItems: cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippngPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    };
    dispatch(createOrder(order));
  };
  useEffect(()=>{
    if(success){
      history.push(`/order/${orderCreate.order.createOrder._id}`)
    }
    // eslint-disable-next-line
  },[history,success])
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod},
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((p, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col md={1}>
                            <Image src={p.image} alt={p.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${p.product}`}>{p.name}</Link>
                          </Col>
                          <Col md={4}>
                            {p.qty} x ${p.price} = ${p.qty * p.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variamt="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
                {error && <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
              </ListGroup.Item>
                  }
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeHolderHandler}
                >
                  {" "}
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
