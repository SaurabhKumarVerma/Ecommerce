import React,{useState,useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import Products from "../Product/Product";
import { useDispatch,useSelector} from "react-redux";
import {listProducts} from "../../action/productAction";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import ProductScreen from "../Productscreen/ProductScreen";



function Home() {
    const dispatch = useDispatch()
    const  productList = useSelector(state => state.productList)
    const {error,loading,products} = productList


    useEffect(() => {
        //Actions Calling
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Product</h1>

            {loading ? <Loader/>
                :error ? <Message variant='danger'>{error}</Message>
                    :<Row>
                        {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Products product={product}/>
                            </Col>
                        ))}

                    </Row>
            }


        </>
    );
}

export default Home;