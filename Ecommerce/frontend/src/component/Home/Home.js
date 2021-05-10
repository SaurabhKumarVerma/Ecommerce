import React from 'react';
import products  from '../../products'
import {Col, Row} from "react-bootstrap";
import Products from "../Product/Product";
import ProductScreen from "../Productscreen/ProductScreen";
function Home() {
    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product={product}/>
                    </Col>
                ))}

            </Row>
        </>
    );
}

export default Home;