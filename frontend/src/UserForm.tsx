import React, {useEffect, useState} from "react";
import UserService from './order'

import { withAuthenticationRequired } from '@auth0/auth0-react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ListGroup, CloseButton } from "react-bootstrap"; 

import { useAuth0 } from '@auth0/auth0-react';
import gql from 'graphql-tag'
import useRequest from './useRequest'

import { TakeShape } from "./TakeShape";

import Header from "./Header";
import SuccessModal from "./SuccessModal";
import WelcomeModal from "./WelcomeModal";
import Total from "./Total";

type Item = {
    product_id: string;
    quantity: string;
  };


function ItemForm() {

  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderId, setOrderId] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [pickupDateTakeShape, setPickupDateTakeShape] = useState('');

  const handleUpdatePickupDate = (newPickupDate: string) => {
    setPickupDateTakeShape(newPickupDate);
  };

  const { user } = useAuth0();

  const customerId = user?.email;
  const pickupLocation = user?.drop_location;

  useEffect(() => {
    console.log('getting items');
    console.log(pickupLocation);
    const fetchOrderItems = async () => {
      if (customerId && pickupDateTakeShape) {
        try {
          console.log('going to fetch items');
          console.log(customerId);
          console.log(pickupDateTakeShape);
          const order = await UserService.getOrder(customerId, pickupDateTakeShape);
          console.log('order')
          console.log(order);
          console.log(order.orderItems);
          console.log(order.order.order_id);
          setOrderId(order.order.order_id);
          setSelectedItems(order.orderItems);
        } catch (error) {
          console.error('Error fetching order items:', error);
        }
     }
    };

    fetchOrderItems();
  }, [customerId, pickupDateTakeShape]);

  const items = [
    'Goat Milk',
    'Jersey Milk',
    'Vanilla Greek Yogurt',
    'Plain Greek Yogurt',
    'Sea Salt Chevre',
    'Garlic Dill Chevre',
    'Garden Veggie Chevre',
    'Feta Cheese',
    'Cottage Cheese',
    'Dark Choco Gelato',
    'Vanilla Gelato',
    'Sweet Spice Chevre',
    'Eggs (dozen)',
    'Honey ($20/qt)',
    'Vanilla Custard',
    'Butter-milk (quart)',
    'Kefir',
    'Jersey Cream ($7/pt)',
    'Choco Milk ($7/hg)',
    'Cream Cheese',
    'Feature Cheese: Mozzarella'
  ];

  const handleItemChange = (e:any) => {
    setSelectedItem(e.target.value);
  };

  const handleQuantityChange = (e:any) => {
    setQuantity(e.target.value);
  };

    const addItem = () => {
    if (selectedItem && quantity) {
      console.log(selectedItem);
      console.log(selectedItems);
      let foundItem = selectedItems.find(item => item.product_id === selectedItem);
      console.log(foundItem);

      if (foundItem) {
        const updatedItems = selectedItems.map(item => {
          if (item.product_id === selectedItem) {
            return {
              ...item,
              quantity: (parseInt(item.quantity) + parseInt(quantity)).toString()
            };
          }
          return item;
        });
        setSelectedItems(updatedItems);
        setSelectedItem('');
        setQuantity('');
        return;
      }

      console.log(foundItem);
      const newItem: Item = {
        product_id: selectedItem,
        quantity: quantity
      };
      setSelectedItems([...selectedItems, newItem]);
      setSelectedItem('');
      setQuantity('');
    }
  };

  const removeItem = (index:any) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
      console.log('submitting');
      console.log(selectedItems);
        //selectedItems.map((value, index) => {
            try {
                UserService.createOrder({user:user, items:selectedItems, orderId:orderId, pickupDate:pickupDateTakeShape})
                    .then( () => {
                        //setModalShow(true);
                    })
            } catch (e) {
                console.error(e);
            } finally {
                console.log('done');
            }

        //});
    }

}

/*
const { loading, error, data } = useRequest(GET_DATES);
if (error) return <h1>Something went wrong!</h1>
if (loading) return <h1>Loading...</h1>
console.log(data)
*/

  return (
    <Container>
        <Header />
        Welcome,<b>{user?.name}</b>!
        You are assigned to the <b>{user?.drop_location}</b> pickup location.
        <TakeShape 
          position="about" 
          pickupLocation={pickupLocation}
          onUpdatePickupDate={handleUpdatePickupDate}
        />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select an Item:</Form.Label>
              <Form.Control as="select" onChange={handleItemChange} value={selectedItem}>
                <option value="">Select an item</option>
                {items.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" onClick={addItem}>
              Add Item
            </Button>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
              Submit
          </Button>
      </Form.Group>
      </Form>
      <ListGroup className="mt-3">
        {selectedItems?.map((item, index) => (
         <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
         {item.quantity} x {item.product_id}
         <CloseButton
           onClick={() => removeItem(index)}
           className="float-right"
         />
       </ListGroup.Item>
        ))}
      </ListGroup>
      
    </Container>
  );
}

export default withAuthenticationRequired(ItemForm, {
  onRedirecting: () => <div>Redirecting you to the login page.  Please wait...</div>,
});
