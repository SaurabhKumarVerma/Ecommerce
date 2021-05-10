import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import {Container} from "react-bootstrap";
import Home from "./component/Home/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductScreen from "./component/Productscreen/ProductScreen";

function App() {
  return (
    <Router >
      <Header/>
        <main className="py-3">
            <Container>
                <Route path='/' component={Home} exact/>
                <Route path='/product/:id' component={ProductScreen} />
            </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
