import React,{useEffect,useState} from 'react';

import {Link} from "react-router-dom";
import Rating from '../Rating/Rating'
import products from "../../products"
import {Button, Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import axios from "axios";


function ProductScreen({match}) {


    const [product, setProduct] = useState([]);

    useEffect(() => {

        async function fetchProducts(){
            const { data} = await axios.get(`/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProducts()

    }, []);


    return (
        <div>
            <Link to='/' className="btn btn-light my-3">GO Back</Link>
            <Row>
                <Col md={6}>
                    <image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name }</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating  value={product.rating} text={`${product.numReviews} rating` } color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description : ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" disabled={product.countInStock == 0} type="button">Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            {product.name}
        </div>

    );
}

export default ProductScreen;