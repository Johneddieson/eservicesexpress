const { 
    create, 
    updateUser, 
    deleteUser, 
    getUser, 
    getUserById ,
    getUserByEmail,
    changeUserPassword,
    updateProfileInformation
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

    },
    changeUserPassword: async (req, res) => 
    {
        var body = req.body
        const salt = genSaltSync(10);
        body.newpassword = hashSync(body.newpassword, salt);
        await getUserById(body.id, ((err, result) => 
        {
            //console.log("hello nge", result.length)
            if (err)
            {
                return res.status(500).json
                ({
                    message: JSON.stringify(err),
                    data: [],
                    success: 0
                })        
            }
            if (result.length <= 0)
            {
                return res.status(404).json
                ({
                    message: 'User not found',
                    data: [],
                    success: 0
                })
            }
            else 
            {
                const oldpasswordComparer = compareSync(body.oldpassword, result[0].password);
                if (oldpasswordComparer)
                {
                    result.password = undefined;
                    changeUserPassword(body, (err, resultforChangingPassword) => 
                    {
                       if (err)
                       {
                        return res.status(500).json
                        ({
                            message: JSON.stringify(err),
                            data: [],
                            success: 0
                        })  
                       }
                       return res.status(200).json
                        ({
                            message: 'Password changed successfully',
                            data: resultforChangingPassword,
                            success: 1
                        }) 
                    })
                }
                else 
                {
                    return res.json
                    ({
                        success: 0,
                        message: 'Incorrect old password.'
                    })
                }
            }
        }))
    },
    updateProfileInformation: async (req, res) => 
    {
        var body = req.body
        await updateProfileInformation(body, ((err, results) => 
        {
            if (err)
            {
                return res.status(500).json
                ({
                    message: JSON.stringify(err),
                    success: 0,
                    data: results
                })
            }
            return res.status(200).json
                ({
                    message: "Information updated successfully!",
                    success: 1,
                    data: results
                })
        }))
    }
}