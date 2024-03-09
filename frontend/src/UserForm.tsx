import React, {useEffect, useState} from "react";
import UserService from './users'

import { withAuthenticationRequired } from '@auth0/auth0-react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ListGroup, CloseButton } from "react-bootstrap"; 

import { useAuth0 } from '@auth0/auth0-react';

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


import Header from "./Header";
import SuccessModal from "./SuccessModal";
import WelcomeModal from "./WelcomeModal";
import Total from "./Total";

type Item = {
    item: string;
    quantity: string;
  };


function ItemForm() {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { user } = useAuth0();

  console.log(user);

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
      let foundItem = selectedItems.find(item => item.item === selectedItem);

      if (foundItem) {
        const updatedItems = selectedItems.map(item => {
          if (item.item === selectedItem) {
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
        item: selectedItem,
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

  return (
    <Container>
        <Header />
      <Form>
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
      </Form>
      <ListGroup className="mt-3">
        {selectedItems.map((item, index) => (
         <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
         {item.quantity} x {item.item}
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
