import React,{useState,useEffect} from 'react';
import products  from '../../products'
import {Col, Row} from "react-bootstrap";
import Products from "../Product/Product";
import axios from 'axios'
import ProductScreen from "../Productscreen/ProductScreen";
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function fetchProducts(){
            const { data} = await axios.get('/products/')
            setProducts(data)
        }

        fetchProducts()

    }, []);

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