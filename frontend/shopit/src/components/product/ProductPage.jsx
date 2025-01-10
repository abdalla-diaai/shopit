import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts';
import { useParams, Link } from 'react-router-dom';
import api, { BASE_URL } from "../../api";
import { toast } from 'react-toastify'; 


function ProductPage({setNumCartItems}) {
    const [product, setProduct] = useState([]);
    const [related, setRelated] = useState([]);
    const [inCart, setInCart] = useState(false);
    const { slug } = useParams();
    const cartCode = localStorage.getItem("cart_code");
    const newItem = { cart_code: cartCode, product_id: product.id };

    useEffect(() => {
        if (product.id) {
            api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`)
            .then(response => {
                console.log(response.data);
                setInCart(response.data.product_in_cart);
                
            })
            .catch(err => {
                console.log('Error', err.message);
            });
        }
       
    }, [cartCode, product.id]);


    function addItem() {
        api.post('add_item/', newItem)
            .then(response => {
                console.log(response.data);
                setInCart(true);
                setNumCartItems(current => current += 1);
                toast.success('Product added to cart!');
            })
            .catch(err => {
                console.log('Error', err.message);
            });
    };

    useEffect(() => {
        api.get(`product_details/${slug}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
                setRelated(response.data.similar_products)
            })
            .catch(err => {
                console.log('Error', err.message);
            });
    }, [slug]);

    return (
        <>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>
                    <img src={`${BASE_URL}${product.image}`} alt="" />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                </Card.Body>
                <Link to={`/products/${product.slug}`}>
                    <Button variant="primary">Go somewhere</Button>
                </ Link>
                <Button className='btn btn-info' type='button' onClick={addItem} disabled={inCart}>
                    {inCart ? "Product added to cart" : "Add to cart"}
                </Button>
            </Card>
            <section>
                <RelatedProducts related={related} />
            </section>
        </>
    );
};

export default ProductPage;