const pool = require("../../config/database");

module.exports = 
{
    create: async (data, callBack) => 
    {
       await pool.query
        (
            `insert into users(firstname, lastname, middlename, suffix, birthdate,
                sex, email,number,city,housenumber,street,barangay,workingInAlcala,
                occupation,businesspermitlength,role,password)
            values (?, ?, ?, ?, ?,
                ?, ?,?,?,?,?,?,?,
                ?,?,?,?)`,
            [
                data.firstname, 
                data.lastname, 
                data.middlename, 
                data.suffix, 
                data.birthdate,
                data.sex, 
                data.email,
                data.number,
                data.city,
                data.housenumber,
                data.street,
                data.barangay,
                data.workingInAlcala,
                data.occupation,
                data.businesspermitlength,
                data.role,
                data.password
            ],
            (error, results, fields) => {
                if (error)
                {
                   return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    updateUser: async (data, callBack) => 
    {
        await pool.query(`update registration set firstName=?, lastName=?, 
        gender=?, email=?, password=?, number=? where id = ?`,
        [
            
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.ID,
        ],
        (error, results, fields) => 
        {
            if (error)
            {
               return callBack(error)
            }
            return callBack(null, results[0]);
        }
        )
    },

    deleteUser: async (data, callBack) => 
    {
        await pool.query(`delete from registration where id = ?`,
        [
            data.ID,
        ],
        (error, results, fields) => 
        {
            if (error)
            {
               return callBack(error)
            }
            return callBack(null, results[0]);
        }
        )
    },
    getUser: async (callBack) => 
    {
        await pool.query(`select firstname, lastname, gender, email, gender, id from registration`,
        (error, results, fields) => 
        {
            if (error)
            {
               return callBack(error)
            }
            return callBack(null, results);
        }
        )
    },
    getUserById: async (id, callBack) => 
    {
        await pool.query(`select id, firstname, lastname, city from users where id = ?`,
        [
            id
        ],
        (error, results, fields) => 
        {
            if (error)
            {
               return callBack(error)
            }
            return callBack(null, results);
        }
        )
    },
    getUserByEmail: async(email, callBack) => 
    {
        await pool.query(`select * from users where email = ?`,
        [email],
        (error, results, field) => 
        {
            if (error)
            {
                return callBack(error)
            }
            return callBack(null, results[0])
        }
        )
    }

}