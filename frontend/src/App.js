import React from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartScreen } from "./screens/CartScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ProfileScreen } from "./screens/Profilescreen";
import { ShippingScreen } from "./screens/ShippingScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen";
import { OrderScreen } from "./screens/OrderScreen";
import UserList from "./screens/UserListScreen";
import { UserEditScreen } from "./screens/UserEditScreen";
import productList from "./screens/ProductListScreen";
import { ProductEditScreen } from "./screens/ProductEditScreen";
import OrderList from "./screens/OrderListScreen";


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' exact component={LoginScreen}/>
          <Route path='/register' exact component={RegisterScreen}/>
          <Route path='/profile' exact component={ProfileScreen}/>
          <Route path='/payment' exact component={PaymentScreen}/>
          <Route path='/placeorder' exact component={PlaceOrderScreen}/>
          <Route path='/order/:id' exact component={OrderScreen}/>
          <Route path='/shipping' exact component={ShippingScreen}/>
          <Route path='/product/:id' exact component={ProductScreen}/>
          <Route path='/admin/users' exact component={UserList}/>
          <Route path='/admin/products' exact component={productList}/>
          <Route path='/admin/products/:pageNumber' exact component={productList}/>
          <Route path='/admin/orders' exact component={OrderList}/>
          <Route path='/admin/user/:id/edit' exact component={UserEditScreen}/>
          <Route path='/admin/product/:id/edit' exact component={ProductEditScreen}/>
          <Route path='/cart/:id?'  component={CartScreen}/>
          <Route path='/search/:keyword' exact component={HomeScreen}/>
          <Route path='/pages/:pageNumber' exact component={HomeScreen}/>
          <Route path='/search/:keyword/pages/:pageNumber' exact component={HomeScreen}/>
          <Route path='/' exact component={HomeScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
    
  );
};

export default App;
