const { createBusinessPermitNew, 
createLineofBusiness,
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
updateUsersBusinessPermitlength,
sendGridEmail,
sendSMSCode,
payMongoAPI,
adyenAPIPayment,
updateBusinessPermitAppointmentSchedule,
updateBusinessPermitDateApproved
} = require("./businesspermit.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token-validation");


router.post("/create", createBusinessPermitNew);
router.post("/createlineofbusiness", createLineofBusiness);
router.post("/createamendment", createAmendment);
router.post("/createbasicinformation", createBasicInformation);
router.post("/createotherinformation", createOtherInformation);
router.get("/totalpendings", getBusinessPermitPendingCount);
router.get("/businesspermitlist", getBusinessPermitList);
router.post("/businesspermitlistfilter", getBusinessPermitListFilter);

router.post("/getBusinessPermitById", getBusinessPermitById);
router.post("/getAmendmentByBusinessPermitId", getAmendmentByBusinessPermitId);
router.post("/getBasicInformationByBusinessPermitId", getBasicInformationByBusinessPermitId);
router.post("/getLineofBusinessByBusinessPermitId", getLineofBusinessByBusinessPermitId);
router.post("/getotherInformationByBusinessPermitId", getotherInformationByBusinessPermitId);
router.post("/updateBusinessPermitStatus", updateBusinessPermitStatus);
router.post("/getUsersById", getUsersById);
router.post("/updateUsersBusinessPermitlength", updateUsersBusinessPermitlength);
router.post("/sendSMSCode", sendSMSCode);
router.post("/payMongoAPI", payMongoAPI);

router.post("/sendGridEmail", sendGridEmail);
router.post("/adyenAPIPayment", adyenAPIPayment);
router.post("/updateBusinessPermitAppointmentSchedule", updateBusinessPermitAppointmentSchedule);
router.post("/updateBusinessPermitDateApproved", updateBusinessPermitDateApproved);
module.exports = router