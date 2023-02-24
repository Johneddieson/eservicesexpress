const { parse } = require("dotenv");
const pool = require("../../config/database");


module.exports = 
{
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
        console.log("basic information", data)
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
}