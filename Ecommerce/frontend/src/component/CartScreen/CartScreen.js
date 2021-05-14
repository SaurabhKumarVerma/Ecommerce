import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row,Col,ListGroup,Image,Form,Button,Card} from "react-bootstrap";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { addToCart } from "../../action/cartAction";

function CartScreen({match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    console.log(cart)
    const { cartItem } = cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch,productId,qty]);

    return (
        <>
            <Row>
                <Col md={8}>
                    <h3>Shopping Cart</h3>
                    {cartItem.length === 0 ?(
                        <Message variant='info'>
                            Your Cart Is Empty <Link to='/'>Go Back</Link>
                        </Message>
                    ):(
                        <ListGroup variant='flush'>
                            {cartItem.map(item =>(
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.Image}/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col></Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                    }
                </Col>

                <Col md={4}>

                </Col>
            </Row>
        </>
    );
}

export default CartScreen;