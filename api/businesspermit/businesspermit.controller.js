const { createBusinessPermitNew, createLineofBusiness ,
    createAmendment,
createBasicInformation,
createOtherInformation,
getBusinessPermitPendingCount,
getBusinessPermitList,
getBusinessPermitListFilter,
getBusinessPermitById,
getAmendmentByBusinessPermitId,
getBasicInformationByBusinessPermitId,
getLineofBusinessByBusinessPermitId,
getotherInformationByBusinessPermitId,
updateBusinessPermitStatus,
getUsersById,
updateUsersBusinessPermitlength} = require("./businesspermit.service")


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
    },
    getBusinessPermitPendingCount: async (req, res) => 
    {
        await getBusinessPermitPendingCount((err, result) => 
        {
            if (err)
            {
                return res.status(500).json
                ({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Business Permit Total Pendings Retrieved!',
                success: 1,
                data: result
            })
        })
    },
    getBusinessPermitList: async (req, res) => 
    {
        await getBusinessPermitList((err, result) => 
        {
            if (err)
            {
                return res.status(500).json
                ({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Business Permit List Retrieved!',
                success: 1,
                data: result
            })
        })
    },
    getBusinessPermitListFilter: async (req, res) => 
    {
        const body = req.body

        await getBusinessPermitListFilter(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Business Permit Queried!',
                success: 1,
                data: result
            })
        })
    },

    getBusinessPermitById: async (req, res) => 
    {
        const body = req.body

        await getBusinessPermitById(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Business Permit By Id Queried!',
                success: 1,
                data: result
            })
        })
    },
    getAmendmentByBusinessPermitId: async (req, res) => 
    {
        const body = req.body

        await getAmendmentByBusinessPermitId(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Amendment By Id Queried!',
                success: 1,
                data: result
            })
        })
    },
    getBasicInformationByBusinessPermitId: async (req, res) => 
    {
        const body = req.body

        await getBasicInformationByBusinessPermitId(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Basic Information By Id Queried!',
                success: 1,
                data: result
            })
        })
    },

    getLineofBusinessByBusinessPermitId: async (req, res) => 
    {
        const body = req.body

        await getLineofBusinessByBusinessPermitId(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Line of Business By Id Queried!',
                success: 1,
                data: result
            })
        })
    },

    getotherInformationByBusinessPermitId: async (req, res) => 
    {
        const body = req.body

        await getotherInformationByBusinessPermitId(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(201).json
            ({
                message: 'Other Information By Id Queried!',
                success: 1,
                data: result
            })
        })
    },
    updateBusinessPermitStatus: async (req, res) => 
    {
        const body = req.body

        await updateBusinessPermitStatus(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(200).json
            ({
                message: 'Business Permit Updated Successfully!',
                success: 1,
                data: result
            })
        })
    },
    getUsersById: async (req, res) => 
    {
        const body = req.body

        await getUsersById(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(200).json
            ({
                message: 'Business Permit Updated Successfully!',
                success: 1,
                data: result
            })
        })
    },
    updateUsersBusinessPermitlength: async (req, res) => 
    {
        const body = req.body

        await updateUsersBusinessPermitlength(body, (err, result) => 
        {
            if (err)
            {
                return res.status(500).json({
                 message: JSON.stringify(err),
                 success: 0,
                 data: []   
                })
            }
            return res.status(200).json
            ({
                message: 'users businesspermit length updated successfully!',
                success: 1,
                data: result
            })
        })
    },
}