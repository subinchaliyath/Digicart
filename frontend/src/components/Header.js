import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import {Route} from 'react-router-dom'

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { Search } from "./Search";

const Header = () => {
  const dispatch=useDispatch()
  const {userInfo}= useSelector(state=>state.userLogin);
  const logoutHandler=()=>{
  dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DigiCart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({history})=><Search history={history}/>}/>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo?(
                <NavDropdown title={userInfo.name} id='username'>
                   <LinkContainer to='/profile'>
                   <NavDropdown.Item>Profile</NavDropdown.Item>
                   </LinkContainer>
                   <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ):(
                <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Sign in
                </Nav.Link>
              </LinkContainer>
              )
              }
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='username'>
                   <LinkContainer to='/admin/users'>
                   <NavDropdown.Item>Users</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/admin/products'>
                   <NavDropdown.Item>Products</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to='/admin/orders'>
                   <NavDropdown.Item>Orders</NavDropdown.Item>
                   </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
