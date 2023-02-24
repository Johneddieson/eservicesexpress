const { createBusinessPermitNew, createLineofBusiness ,
    createAmendment,
createBasicInformation,
createOtherInformation} = require("./businesspermit.service")


module.exports = 
{
    createBusinessPermitNew: async (req, res) => 
    {
        const body = req.body
        await createBusinessPermitNew(body, (err, results) => 
        {
                if (err) 
                {
                   return res.status(500).json({
                        message: JSON.stringify(err),
                        success: 0,
                        results: 500
                    })
                }
                return res.status(201).json
                ({
                    success: 1,
                    message: "Created Business Permit Successfully!",
                    data: results
                }) 
        }
        )
    },

    createLineofBusiness: async (req, res) => 
    {
        const body = req.body

        await createLineofBusiness(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0   
                })
            }
            return res.status(201).json
            ({
                message: 'Line of business created successfully!',
                success: 1
            })
        })
    },

    createAmendment: async (req, res) => 
    {
        const body = req.body

        await createAmendment(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0   
                })
            }
            return res.status(201).json
            ({
                message: 'Amendment created successfully!',
                success: 1
            })
        })
    },
    createBasicInformation: async (req, res) => 
    {
        const body = req.body

        await createBasicInformation(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0   
                })
            }
            return res.status(201).json
            ({
                message: 'Basic Information created successfully!',
                success: 1
            })
        })
    },
    createOtherInformation: async (req, res) => 
    {
        const body = req.body

        await createOtherInformation(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0   
                })
            }
            return res.status(201).json
            ({
                message: 'Basic Information created successfully!',
                success: 1
            })
        })
    }
}