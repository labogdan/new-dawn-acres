import React, {useEffect, useState} from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import UserService from './users'
import Header from "./Header";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from "react-bootstrap/Table";


const DisplayUsers = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await UserService.getAllAUsers();
            const json = await data;
            setUsers(json.users);
            console.log(json.users);
        }
        fetchData()
            .catch(console.error);

    },[])

    return (
        <Container>
            <Header />
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Grade</th>
                            <th>Volunteer Positions</th>
                            <th>Volunteer Other</th>
                            <th>Kroger Participate</th>
                            <th>Kroger Enrolled</th>
                            <th>Parent Name</th>
                            <th>Email Address</th>
                            <th>Parent Adult Leader</th>
                            <th>PayPal Address</th>
                            <th>Total Cost</th>
                        </tr>


                            {
                                users.map(function({first_name, last_name, age, grade, volunteer_positions, volunteer_other, kroger_participate, kroger_enrolled, parent_name, email_address, is_adult_leader, paypal_address, total_cost, id}){
                                    return (
                                        <tr key={id}>
                                            <td>{first_name}</td>
                                            <td>{last_name}</td>
                                            <td>{age}</td>
                                            <td>{grade}</td>
                                            <td>{volunteer_positions}</td>
                                            <td>{volunteer_other}</td>
                                            <td>{kroger_participate}</td>
                                            <td>{kroger_enrolled}</td>
                                            <td>{parent_name}</td>
                                            <td>{email_address}</td>
                                            <td>{is_adult_leader}</td>
                                            <td>{paypal_address}</td>
                                            <td>{total_cost}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )

}

export default withAuthenticationRequired(DisplayUsers, {
    onRedirecting: () => <div>Redirecting you to the login page.  Please wait...</div>,
});
