const { Pool } = require('pg');
const DB_URL = process.env.DATABASE_URL || 'postgres://nyxaoatdhmtzbq:76349063f4859041374a78b4b62924f5f4610e861861ff4e7e2d97598cf5d547@ec2-54-167-29-148.compute-1.amazonaws.com:5432/d70vmufbhk3kof';

exports.updateOrder = async (req, res, next) => {
    const pool = new Pool({
        connectionString: DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    const data = req.body;
    const orderId = data.orderId;
    const pickupDate = data.pickupDate;


    console.log('we are in updateOrder()');
    //console.log(data);
    console.log(orderId);
    console.log(data.items);

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        console.log('About to update data');

        // Perform the UPDATE query for the orders table
        await client.query(
            `UPDATE orders 
            SET customer_id = $1, 
                order_date = $2, 
                pickup_date = $3
            WHERE order_id = $4`,
            [data.user.email, new Date().toISOString().split('T')[0], pickupDate, orderId]
        );

        // Loop through items to update orderItems table (assuming an update is required for each item)
        console.log('*****LOOP********')

        const payloadProductIds = new Set(data.items.map(item => item.product_id));

    // Get the existing product_ids for the given orderId from the orderItems table
    const result = await client.query(
      'SELECT product_id FROM orderItems WHERE order_id = $1',
      [orderId]
    );

    const existingProductIds = new Set(result.rows.map(row => row.product_id));

    // Delete items that are present in the database but not in the payload
    for (const productId of existingProductIds) {
      if (!payloadProductIds.has(productId)) {
        await client.query(
          'DELETE FROM orderItems WHERE order_id = $1 AND product_id = $2',
          [orderId, productId]
        );
      }
    }

    // Insert or update items based on the payload
    for (const itemData of data.items) {
      console.log(itemData);

      if (existingProductIds.has(itemData.product_id)) {
        // If the item exists, update its quantity
        await client.query(
          'UPDATE orderItems SET quantity = $1 WHERE order_id = $2 AND product_id = $3',
          [itemData.quantity, orderId, itemData.product_id]
        );
      } else {
        // If the item doesn't exist, insert a new row
        await client.query(
          'INSERT INTO orderItems (order_id, product_id, quantity) VALUES ($1, $2, $3)',
          [orderId, itemData.product_id, itemData.quantity]
        );
      }
    }


        console.log('*****END*LOOP********');
        await client.query('COMMIT'); // Commit the transaction

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction in case of an error
        console.error('Error updating order and items:', error);
        return res.status(400).send({
            message: error.message
        });
    } finally {
        client.release();
    }

    return res.status(200).send({
        message: 'success'
    });

}


exports.createOrder = async (req, res, next) => {
    const pool = new Pool({
        connectionString: DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    const data = req.body;
    const pickupDate = data.pickupDate;
    const client = await pool.connect();

    const total = data.items.forEach(element => {
        console.log(element);
    });

      try {
        await client.query('BEGIN'); 
    
        console.log('about to write data');

        const orderResult = await client.query(
          'INSERT INTO orders (customer_id, order_date, pickup_date) VALUES ($1, $2, $3) RETURNING order_id',
          [data.user.email, new Date().toISOString().split('T')[0], pickupDate] // TODO: put in the real drop date
        );
    
        const orderId = orderResult.rows[0].order_id;
        console.log(orderId);

        for (const itemData of data.items) {
            await client.query(
              'INSERT INTO orderItems (order_id, product_id, quantity) VALUES ($1, $2, $3)',
              [orderId, itemData.product_id, itemData.quantity]
            );
          }

        await client.query('COMMIT'); // Commit the transaction
        

        } catch (e) {
            await client.query('ROLLBACK'); // Rollback the transaction in case of an error
            console.error('Error inserting order and items:', error);
            return res.status(400).send({
                message: err
            })
        } finally {
            client.release();
            pool.end();
        }
        
        return res.status(200).send({
            message: 'success'
        })
};

exports.getOrder = async (req, res, next) => {
    const pool = new Pool({
        connectionString: DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    const customer_id = req.params.customerId;
    const pickup_date = req.params.pickupDate;


    console.log(req.params)
    console.log('searching for order');
    console.log(customer_id);
    console.log(pickup_date);

    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start a transaction

        // Retrieve order details
        const orderQuery = await client.query(
            'SELECT * FROM orders WHERE customer_id = $1 AND pickup_date = $2',
            [customer_id, pickup_date]
        );
        const order = orderQuery.rows[0];

        if (!order) {
            throw new Error('Order not found');
        }

        console.log(order)

        // Retrieve order items
        const orderItemsQuery = await client.query(
            'SELECT * FROM orderItems WHERE order_id = $1',
            [order.order_id]
        );
        //  console.log(orderItemsQuery);
        const orderItems = orderItemsQuery.rows;

        await client.query('COMMIT'); // Commit the transaction
        res.status(200).json({ order, orderItems });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction in case of an error
        console.error('Error retrieving order:', error);
        res.status(404).json({ error: 'Order not found.' });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

