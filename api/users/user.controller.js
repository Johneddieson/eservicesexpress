const { 
    create, 
    updateUser, 
    deleteUser, 
    getUser, 
    getUserById ,
    getUserByEmail
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require('jsonwebtoken');
module.exports = 
{
    createUser: (req, res) => 
    {
        const body = req.body;
        //console.log("body", body)
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json
                ({
                    success: 0,
                    mesage: JSON.stringify(err)
                })
            }
            return res.status(200).json
            ({
                success: 1,
                data: results
            })
        })
    },

    updateUser: (req, res) => 
    {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
               return false
            }
            if (!results)
            {
                return res.status(500).json
                ({
                    success: 0,
                    mesage: JSON.stringify(err)
                })
            }
            return res.status(200).json
            ({
                success: 1,
                data: results
            })
        })
    },
    deleteUser: (req, res) => 
    {
        const body = req.body;
        deleteUser(body, (err, results) => {
            if (err) {
                return res.status(500).json
                ({
                    success: 0,
                    mesage: JSON.stringify(err)
                })
            }
            return res.status(200).json
            ({
                success: 1,
                data: results
            })
        })
    },
    getUser: (req, res) => 
    {
        getUser((err, results) => {
            if (err) {
                return res.status(500).json
                ({
                    success: 0,
                    mesage: JSON.stringify(err)
                })
            }
            return res.status(200).json
            ({
                success: 1,
                data: results
            })
        })
    },
    getUserByID: (req, res) => 
    {
        getUserById(req.params.id, (err, results) => {
            if (err) {
                return res.status(500).json
                ({
                    success: 0,
                    mesage: JSON.stringify(err)
                })
            }
            return res.status(200).json
            ({
                success: 1,
                data: results
            })
        })
    },
    login: (req,res) => 
    {
        const body = req.body;

        getUserByEmail(body.email, (err, results) => 
        {
            if (err)
            {
                console.log(err)
            }
            if (!results)
            {
                return res.json
                ({
                    success: 0,
                    message: 'The email was not found to the database.'
                })
            }
            const result = compareSync(body.password, results.password);
            if (result)
            {
                results.password = undefined;
                // const jsontoken = sign
                // ( 
                //     {
                //         result: results
                //     }, 
                //     "qwe1234", 
                // {
                //     expiresIn: "1h"
                // }
                // )
                return res.json
                ({
                    success: 1,
                    message: 'Login successfully!',
                    //token: jsontoken
                    data: results
                }) 
            }
            else 
            {
                return res.json
                ({
                    success: 0,
                    message: 'Incorrect password.'
                })
            }
        })

    }
}