const { createBusinessPermitNew, 
createLineofBusiness,
createAmendment,
createBasicInformation,
createOtherInformation} = require("./businesspermit.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token-validation");


router.post("/create", createBusinessPermitNew);
router.post("/createlineofbusiness", createLineofBusiness);
router.post("/createamendment", createAmendment);
router.post("/createbasicinformation", createBasicInformation);
router.post("/createotherinformation", createOtherInformation);
module.exports = router