const { parse } = require("dotenv");
const pool = require("../../config/database");
const nodemailer = require("nodemailer");
const { callbackPromise } = require("nodemailer/lib/shared");
const client = require('twilio')('ACfc0131db4c2908631b5940ac6f3584fa', '8cd9694402b7bf170a8a1124025f91e6')
const paymongo = require('paymongo-node')('sk_test_pXt5FyeKwRVB5tm6sKAUiKH4');
const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
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
        },
    port: 25,
    // tls: {
    //     rejectUnauthorized: false
    // },
    //logger: true,
    //debug: false
    })
    let details = 
    {
        from: 'Alcala Eservices Admin',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html
    }
     mailTrasnporter.sendMail(details, (err, info) => 
    {
        if (err)
        {
            console.log("there is an error", err)
            return callBack(err)
        }
            //console.log("email sent", info)
            console.log("email sent")
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
                `update businesspermit set status = ?, dateapproved = ?, appointmentschedule = ? where businesspermitid = ?`,
                [
                    data.status,
                    data.dateapproved,
                    data.appointmentschedule,
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

    sendSMSCode: async (data, callBack) => 
    {
        client.messages.create
        ({
            body: '87261',
            to: '+639654717066',
            from: '+15673473318'
        }).then(message => {
            console.log("nag error", message)
            return callBack(null, message)
        })
        .catch(err => 
            {
                console.log("nag error", err)
                return callBack(err)
            })
    },

    payMongoAPI: async (data, callBack) => 
    {
        paymongo.paymentIntents.create({
            amount: 10000,
            payment_method_allowed: ['gcash'],
            currency: 'PHP' 
            // insert other required attributes here
          })
            .then(function(resource) {
              console.log("resource", resource);
              callBack(null, resource)
            })
            .catch(function(e) {
                callBack(e)
              if (e.type === "AuthenticationError") {
                // Handle authentication error
              } else if (e.type === "InvalidRequestError") {
                // Handle validation errors
                e.errors.forEach(function (error) {
                  console.log("error code", error.code);
                  console.log("error detail", error.detail);
                })
              }
            });
    },
    adyenAPIPayment: async (data, callBack) => 
    {
        const config = new Config();
config.apiKey = 'AQEwhmfuXNWTK0Qc+iSTh3chquWvTYhFA5xGV2Jfw2v8yjdEh5P+VU+aMDqRSi643FcrEMFdWw2+5HzctViMSCJMYAc=-POTE44d+sI2egGADE/PkBovp6eti57flfZPBPlUSAZ0=-yyMDmP8b_8<$+b>z'

config.merchantAccount = 'CusymaTechnologies741ECOM';
const clientAdyen = new Client({ config });
clientAdyen.setEnvironment("TEST");
const checkout = new CheckoutAPI(clientAdyen);

checkout.payments({
    amount: { currency: "PHP", value: 1000 },
    paymentMethod: {
        type: 'gcash',
        storedPaymentMethodId: "7219687191761347"
    },
    reference: "test",
    merchantAccount: config.merchantAccount,
    shopperReference: "test",
    returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
    shopperInteraction: "ContAuth",
    recurringProcessingModel: "Subscription"
}).then((res) => 
{
    console.log("payment response", res)
    callBack(null, res)
}).catch((err) => 
{
    callBack(err)
    console.log("payment response error", err)
})
    },
    updateBusinessPermitAppointmentSchedule: async (data, callBack) => 
    {
            await pool.query
            (
                `update businesspermit set appointmentschedule = ? where businesspermitid = ?`,
                [
                    data.appointmentschedule,
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
}