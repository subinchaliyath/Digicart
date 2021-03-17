import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const Paginator = ({pages=1,pageNumber,isAdmin=false,keyword=''}) => {
    return pages > 1 && (
<Pagination>
    {[...Array(pages).keys()].map(x=>{
        return(
            <LinkContainer key={x+1} to={!isAdmin?(keyword? `/search/${keyword}/pages/${x+1}`:`/pages/${x+1}`):`/admin/products/${x+1}`}>
            <Pagination.Item active={x+1===pageNumber}>{x+1}</Pagination.Item>
            </LinkContainer>
        )
    })}
</Pagination>
    )
    
}
