const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgres://yhaldrjyvtauiy:cfe98df02a0874281a267a3b58d669959fd1aaf96e31b4580aa42bc9d5618f9b@ec2-18-214-35-70.compute-1.amazonaws.com:5432/d882a6s32l45oe';

const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

exports.getUsers = (req, res, next) => {

    const getString = 'SELECT * FROM users ORDER BY id DESC';
    pool.query(getString)
        .then(results => {
            let users = results.rows;
            res.json({ users })
        })
        .catch(err => { return res.status(400).send({
            message: err
         })});

    /*res.status(200).json({
        users: [
            {
                first_name: 'Ella',
                last_name: 'Bogdan',
                age: '9',
                grade: '4'
            },
            {
                first_name: 'Anna',
                last_name: 'Lee',
                age: '10',
                grade: '5'
            }
        ]
    });*/
};

exports.createUser = (req, res, next) => {

    const user = [ req.body ]
    const addString = 'INSERT INTO users (first_name, last_name, age, grade, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';

    pool.query(addString, user[[0]])
        .then(result => res.json(result))
        .catch(err => { return res.status(400).send({
            message: err
        })});

};
