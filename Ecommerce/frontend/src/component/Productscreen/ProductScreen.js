import React,{useEffect,useState} from 'react';
import './qtyStyle.css'
import {Link} from "react-router-dom";
import Rating from '../Rating/Rating'
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import {Button, Card, Col, ListGroup, ListGroupItem, Row,Form} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import { listProductsDeatils } from "../../action/productAction";
import 'bootstrap/dist/css/bootstrap.min.css'

function ProductScreen({ match,history }) {
    const [qty, setQty] = useState(0);

    const dispatch = useDispatch()
    const productListDetails = useSelector(state => state.productDetails)

    const { error,loading,product} = productListDetails


    useEffect(() => {
        dispatch(listProductsDeatils(match.params.id))
    }, []);

    const addToCartHandler = () =>{
         history.push(`/cart/${match.params.id}?qty=${qty}`)

    }

    return (
        <div>
            <Link to='/' className="btn btn-light my-3">GO Back</Link>

            {loading ? <Loader/>
                :error
                    ?<Message variant='danger'>{error}</Message>
                :(
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
                                        Description : {product.description}
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

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Quantity:
                                                    </Col>
                                                    <Col xs = 'auto' className='my-1'>

                                                        <div className="quantity" xs='auto'>
                                                            {/*<button className="btn minus-btn disabled" type="button" onClick={() => setQty(qty -1)}>-*/}
                                                            <button className="btn plus-btn " xs = 'auto' type="button" onClick={() => setQty(qty - 1)}>-
                                                            </button>
                                                                <input type="text" id="quantity" value={qty > 0 ? qty : 0 } readOnly/>
                                                            <button className="btn plus-btn "  xs = 'auto' type="button" onClick={() => setQty(qty + 1)}>+
                                                            </button>
                                                        </div>

                                                        {/*<Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>*/}
                                                        {/*    /!*{*!/*/}
                                                        {/*    /!*    [...Array(product.countInStock).keys()].map((x) =>(*!/*/}
                                                        {/*    /!*        <option key={x+1} value={x+1}>*!/*/}
                                                        {/*    /!*            {x + 1}*!/*/}
                                                        {/*    /!*        </option>*!/*/}
                                                        {/*    /!*    ))*!/*/}
                                                        {/*    /!*}*!/*/}
                                                        {/* */}
                                                        {/*</Form.Control>*/}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>

                                            <Button onClick={addToCartHandler} className="btn-block"  disabled={product.countInStock == 0} type="button" >Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                            {product.name}
                        </Row>

                    )

            }


        </div>

    );
}

export default ProductScreen;