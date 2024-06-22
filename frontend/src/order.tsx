import axios from 'axios'

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

const baseUrl = 'feed/order'

const getOrder = (customerId: any, pickupDate: any) => {
    const request = axios.get(`feed/order/${customerId}/${pickupDate}`)
    return request.then(response => response.data)
}

const createOrder = (order: any) => {

    console.log('we have orderid?')
    console.log(order.orderId);

    if (order.orderId) {
        console.log('we have existing order: PUT')
        const request = axios.put('feed/order', order);
        console.log('updating order')
        return request.then(response => {
            console.log('here')
            console.log('this got sent back from the backend', response);
            return response.data
        });
    } else {
        console.log('we have  no order yet: POST')
        const request = axios.post('feed/order', order);
        console.log('creating order')
        return request.then(response => {
            console.log('here')
            console.log('this got sent back from the backend', response);
            return response.data
        });
    }
    

}

export default { getOrder, createOrder }
