const { parse } = require("dotenv");
const pool = require("../../config/database");
const nodemailer = require("nodemailer");



module.exports = 
{

sendGridEmail: async (data, callBack) => 
{ 
    let mailTrasnporter = nodemailer.createTransport
    ({
        service: 'gmail',
        auth: 
        {
            user: 'alcalaeservices@gmail.com',
            pass: 'wjddtxnqetvobdlg'
        }
    })
    let details = 
    {
        from: 'Alcala Eservices Admin',
        to: data.to,
        subject: data.subject,
        text: data.text
    }
    mailTrasnporter.sendMail(details, (err) => 
    {
        if (err)
        {
           // console.log("there is an error", err)
            return callBack(err)
        }
        
        //    console.log("email sent")
            return callBack(null, 'success')
        
    })
},

    createBusinessPermitNew: async (data, callBack) => 
    {
        await pool.query
        (
            `insert into businesspermit (DateCreated,DateApproved,Status,ApplicantSignature,Type,UserId) 
            values 
                (?,?,?,?,?,?)`,
                    [
                        data.DateCreated,
                        data.DateApproved,
                        data.Status,
                        data.ApplicantSignature,
                        data.Type,
                        data.UserId
                    ],
                    async (err, results, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, results);                        
                    }
        )
    },


    createLineofBusiness: async (data, callBack) => 
    {
        //console.log("the data from line of business", data)
               await  pool.query
                (
                    `insert into lineofbusiness (LineOfBusiness, NoOfUnits, Capitalization, Essential, NonEssential, BusinessPermitId)
                    values (?,?,?,?,?,?)`,
                    [
                        data.LineOfBusiness, 
                        data.NoOfUnits, 
                        data.Capitalization, 
                        data.Essential, 
                        data.NonEssential, 
                        parseInt(data.businesspermitid)
                    ],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    createAmendment: async (data, callBack) => 
    {
        //console.log("the data from line of business", data)
               await  pool.query
                (
                    `insert into amendment (Mula, Hanggang, BusinessPermitId)
                    values (?,?,?)`,
                    [
                        data.Mula, 
                        data.Hanggang, 
                        parseInt(data.BusinessPermitId)
                    ],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    createBasicInformation: async (data, callBack) => 
    {
        //console.log("basic information", data)
               await  pool.query
                (
                    `insert into basicinformation (ModeOfPayment,DateOfApplication,TinNo,
                        DtiSecCdaRegistrationNumber,DtiSecCdaRegistrationDate,
                        TypeOfBusiness,TaxIncentiveGovernmentEntity,SpecifyEntity,
                        TaxPayerLastName,TaxPayerFirstName,TaxPayerMiddleName,
                        TaxPayerBusinessName,TradeNameFranchise,
                        BusinessPermitId)
                    values (?,?,?,
                        ?,?,
                        ?,?,?,
                        ?,?,?,
                        ?,?,?)`,
                    [
                        data.ModeOfPayment,
                        data.DateOfApplication,
                        data.TinNo, 
                        data.DtiSecCdaRegistrationNumber,
                        data.DtiSecCdaRegistrationDate,
                        data.TypeOfBusiness,
                        data.TaxIncentiveGovernmentEntity,
                        data.SpecifyEntity,
                        data.TaxPayerLastName,
                        data.TaxPayerFirstName,
                        data.TaxPayerMiddleName,
                        data.TaxPayerBusinessName,
                        data.TradeNameFranchise,
                        parseInt(data.BusinessPermitId)
                    ],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },


    createOtherInformation: async (data, callBack) => 
    {
        //console.log("the data from line of business", data)
               await  pool.query
                (
                    `insert into otherinformation (BusinessAddress,BusinessPostalCode,BusinessTelephoneNumber,
                        BusinessEmailAddress,BusinessMobileNumber,
                        OwnersAddress,OwnersPostalCode,OwnersTelephoneNumber,
                        OwnersEmailAddress,OwnersMobileNumber,IncaseOfEmergencyContactPerson,
                        IncaseOfEmergencyPhoneorMobileNumber,IncaseOfEmergencyEmailAddress,
                        BusinessAreaInSqm,TotalNoOfEmployeesMale,TotalNoOfEmployeesFemale,
                        NumberOfEmployeesResidingLGU,LessorsFullname,
                        LessorsAddress,LessorsTelephoneMobileNumber,LessorsEmailAddress,
                        LessorsMonthlyRental,GrossSalesReceipts,BusinessPermitId)
                    values (?,?,?,
                        ?,?,
                        ?,?,?,
                        ?,?,?,
                        ?,?,
                        ?,?,?,
                        ?,?,
                        ?,?,?,
                        ?,?,?)`,
                    [
                        data.BusinessAddress,
                        data.BusinessPostalCode,
                        data.BusinessTelephoneNumber,
                        data.BusinessEmailAddress,
                        data.BusinessMobileNumber,
                        data.OwnersAddress,
                        data.OwnersPostalCode,
                        data.OwnersTelephoneNumber,
                        data.OwnersEmailAddress,
                        data.OwnersMobileNumber,
                        data.IncaseOfEmergencyContactPerson,
                        data.IncaseOfEmergencyPhoneorMobileNumber,
                        data.IncaseOfEmergencyEmailAddress,
                        data.BusinessAreaInSqm,
                        data.TotalNoOfEmployeesMale,
                        data.TotalNoOfEmployeesFemale,
                        data.NumberOfEmployeesResidingLGU,
                        data.LessorsFullname,
                        data.LessorsAddress,
                        data.LessorsTelephoneMobileNumber,
                        data.LessorsEmailAddress,
                        data.LessorsMonthlyRental,
                        data.GrossSalesReceipts,
                        parseInt(data.BusinessPermitId)
                    ],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    getBusinessPermitPendingCount: async (callBack) => 
    {
               await  pool.query
                (
                    `select count(status) as status from businesspermit where status = 'Pending'`,
                    
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result[0]);
                    }
                )
            

    },

    getBusinessPermitList: async (callBack) => 
    {
               await  pool.query
                (
                    `select concat(u.firstname, char(32),  u.middlename, char(32),  u.lastname) as applicantFullname, u.email as applicantEmail,
                    bp.DateCreated as date, bp.Status as status,
                    concat(bf.TaxPayerFirstName, char(32), bf.TaxPayerMiddleName, char(32), bf.TaxPayerLastName) as taxpayerFullname,
                    bf.TaxPayerBusinessName as businessname, bf.TradeNameFranchise as tradenameFranchise,
                    bp.BusinessPermitId as businessPermitId, bp.Type as type
                    from businesspermit as bp inner join amendment as amend on bp.BusinessPermitId = amend.BusinessPermitId
                    inner join basicinformation as bf on bp.BusinessPermitId = bf.BusinessPermitId
                    inner join users as u on bp.UserId = u.id  order by bp.DateCreated DESC`,
                    
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },


    getBusinessPermitListFilter: async (data, callBack) => 
    {
        var sqlClause = ''

        sqlClause += sqlClause == '' ? data.dateTodayCheckBox == false ? '' : ` where  bp.DateCreated between '${data.datefromfilter} 00:00' and '${data.datetofilter} 23:59'` : data.dateTodayCheckBox == false ? '' : ` and  bp.DateCreated between '${data.datefromfilter}' and '${data.datetofilter}'`; 
        sqlClause += sqlClause == '' ? data.applicantFullnameCheckBox == false ? '' : ` where concat(u.firstname, char(32),  u.middlename, char(32),  u.lastname) like '%${data.applicantfullnamefilter}%'` : data.applicantFullnameCheckBox == false ? '' : ` and concat(u.firstname, char(32),  u.middlename, char(32),  u.lastname) like '%${data.applicantfullnamefilter}%'`; 
        sqlClause += sqlClause == '' ? data.applicantEmailCheckBox == false ? '' : ` where  u.email like '%${data.applicantemailfilter}%'` : data.applicantEmailCheckBox == false ? '' : ` and  u.email like '%${data.applicantemailfilter}%'`; 
        sqlClause += sqlClause == '' ? data.taxpayerFullnameCheckBox == false ? '' : ` where concat(bf.TaxPayerFirstName, char(32), bf.TaxPayerMiddleName, char(32), bf.TaxPayerLastName) like '%${data.taxpayerfullnamefilter}%'` : data.taxpayerFullnameCheckBox == false ? '' : ` and concat(bf.TaxPayerFirstName, char(32), bf.TaxPayerMiddleName, char(32), bf.TaxPayerLastName) like '%${data.taxpayerfullnamefilter}%'`; 
        sqlClause += sqlClause == '' ? data.businessNameCheckBox == false ? '' : ` where bf.TaxPayerBusinessName like '%${data.businessnamefilter}%'` : data.businessNameCheckBox == false ? '' : ` and bf.TaxPayerBusinessName like '%${data.businessnamefilter}%'`; 
        sqlClause += sqlClause == '' ? data.businessPermitTypeCheckBox == false ? '' : ` where bp.Type = '${data.typefilter}'` : data.businessPermitTypeCheckBox == false ? '' : ` and bp.Type = '${data.typefilter}'`; 
        sqlClause += sqlClause == '' ? data.statusCheckBox == false ? '' : ` where bp.Status = '${data.statusfilter}'` : data.statusCheckBox == false ? '' : ` and bp.Status = '${data.statusfilter}'`; 
        

               await  pool.query
                (
                    `select concat(u.firstname, char(32),  u.middlename, char(32),  u.lastname) as applicantFullname, u.email as applicantEmail,
                    bp.DateCreated as date, bp.Status as status,
                    concat(bf.TaxPayerFirstName, char(32), bf.TaxPayerMiddleName, char(32), bf.TaxPayerLastName) as taxpayerFullname,
                    bf.TaxPayerBusinessName as businessname, bf.TradeNameFranchise as tradenameFranchise,
                    bp.BusinessPermitId as businessPermitId, bp.Type as type
                    from businesspermit as bp inner join amendment as amend on bp.BusinessPermitId = amend.BusinessPermitId
                    inner join basicinformation as bf on bp.BusinessPermitId = bf.BusinessPermitId
                    inner join users as u on bp.UserId = u.id ${sqlClause}  order by bp.DateCreated DESC`,
                    
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },




    getBusinessPermitById: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from businesspermit where businesspermitid = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    getAmendmentByBusinessPermitId: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from amendment where businesspermitid = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    getBasicInformationByBusinessPermitId: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from BasicInformation where businesspermitid = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    getLineofBusinessByBusinessPermitId: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from LineofBusiness where businesspermitid = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },

    getotherInformationByBusinessPermitId: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from otherInformation where businesspermitid = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },
    updateBusinessPermitStatus: async (data, callBack) => 
    {
            await pool.query
            (
                `update businesspermit set status = ? where businesspermitid = ?`,
                [
                    data.status,
                    data.businesspermitid
                ],
                (err, result, fields) => 
                {
                    if (err)
                    {
                        return callBack(err)
                    }
                    return callBack(null, result)
                }
            )
    },
    getUsersById: async (data, callBack) => 
    {
               await  pool.query
                (
                    `select * from users where id = ?`,
                    [data.id],
                    (err, result, fields) => 
                    {
                        if (err)
                        {
                            return callBack(err);
                        }
                        return callBack(null, result);
                    }
                )
            

    },
    updateUsersBusinessPermitlength: async (data, callBack) => 
    {
            await pool.query
            (
                `update users set businesspermitlength = businesspermitlength + 1  where id = ?`,
                [
                    data.id,
                ],
                (err, result, fields) => 
                {
                    if (err)
                    {
                        return callBack(err)
                    }
                    return callBack(null, result)
                }
            )
    },
}