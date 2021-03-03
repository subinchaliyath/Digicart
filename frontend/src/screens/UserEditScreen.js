import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails,adminUpdate } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";
import { Link } from "react-router-dom";
import { ADMIN_UPDATE_PRESET } from "../constants/userConstants";

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const AdminUpdate = useSelector((state) => state.AdminUpdate);
  const { loading:adminLoading, error:adminError, success:adminSuccess } = AdminUpdate;

  useEffect(() => {
      if(adminSuccess){
          dispatch({type:ADMIN_UPDATE_PRESET})
          history.push('/admin/users')
      }else{
        if(!user.name || user._id !==userId){
            dispatch(getUserDetails(userId))
      }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
      }
      }
      
  }, [user, userId, dispatch,adminSuccess,history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUpdate({_id:userId,name,email,isAdmin}))
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {adminLoading && <Loader/>}
        {adminError && <Message variant='danger'>{adminError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
