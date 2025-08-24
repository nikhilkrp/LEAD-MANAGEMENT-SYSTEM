import express from "express"

import { createLead,updateLead,deleteLead,getLeadById,getLeads } from "../controller/leadController.js"

const router = express.Router();

router.post("/" , createLead);
router.get("/" , getLeads);
router.get("/:id" , getLeadById);
router.put("/:id" , updateLead);
router.delete("/:id" , deleteLead);

export default router;

