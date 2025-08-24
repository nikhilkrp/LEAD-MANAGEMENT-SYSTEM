import Lead from "../models/leads.models.js"


// create lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    console.log("createLead :: ", error);
    res.status(500).json({ message: "Server error" })
  }
}

// pagination && filteration
export const getLeads = async (req, res) => {
  try {

    const { page = 1, limit = 20, ...filters } = req.query;
    const query = {};

    if (filters.email) query.email = { $regex: filters.email, $options: "i" }
    if (filters.company) query.company = { $regex: filters.company, $options: "i" }
    if (filters.city) query.city = { $regex: filters.city, $options: "i" }
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source
    if (filters.is_qualified) query.is_qualified = filters.is_qualified === "true";

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: leads,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.log("getLeads error", error);
    res.status(500).json({ message: "Server error" })
  }
}

// get a single lead

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    console.error("getLeadById error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    console.error("updateLead error", error);
    res.status(500).json({ message: "Server error" });
  }
};
// delete a lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (error) {
    console.error("deleteLead error", error);
    res.status(500).json({ message: "Server error" });
  }
};