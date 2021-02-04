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


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' exact component={LoginScreen}/>
          <Route path='/register' exact component={RegisterScreen}/>
          <Route path='/product/:id' exact component={ProductScreen}/>
          <Route path='/cart/:id?'  component={CartScreen}/>
          <Route path='/' exact component={HomeScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
    
  );
};

export default App;
