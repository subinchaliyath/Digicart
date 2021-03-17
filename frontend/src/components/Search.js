import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Search = ({history}) => {

  const [keyword, setKeyword] = useState("");
  const submitHandler =(e)=>{
      e.preventDefault()
      if(keyword){
          history.push(`/search/${keyword}`)
      }
      else{
          history.push('/')
      }
  }
  return (
    <Form inline onSubmit={submitHandler}>
      <Form.Control
        type="text"
        placeholder='Search Products...'
        className="ml-sm-3 mr-sm-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className='p-2 mt-sm-1'>
        Search
      </Button>
    </Form>
  );
};
