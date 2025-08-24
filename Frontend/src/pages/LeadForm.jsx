import React, { useState, useEffect } from "react";

const LeadForm = ({ onSubmit, leadData, onCancel }) => {
  const [lead, setLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
  });

  useEffect(() => {
    if (leadData) setLead(leadData);
  }, [leadData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lead);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={lead.first_name} onChange={handleChange} placeholder="First Name" />
      <input name="last_name" value={lead.last_name} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={lead.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={lead.phone} onChange={handleChange} placeholder="Phone" />
      <input name="company" value={lead.company} onChange={handleChange} placeholder="Company" />
      <input name="city" value={lead.city} onChange={handleChange} placeholder="City" />
      <input name="state" value={lead.state} onChange={handleChange} placeholder="State" />
      <select name="source" value={lead.source} onChange={handleChange}>
        <option value="website">Website</option>
        <option value="facebook_ads">Facebook Ads</option>
        <option value="google_ads">Google Ads</option>
        <option value="referral">Referral</option>
        <option value="events">Events</option>
        <option value="other">Other</option>
      </select>
      <select name="status" value={lead.status} onChange={handleChange}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="lost">Lost</option>
        <option value="won">Won</option>
      </select>
      <input type="number" name="score" value={lead.score} onChange={handleChange} placeholder="Score" />
      <input type="number" name="lead_value" value={lead.lead_value} onChange={handleChange} placeholder="Lead Value" />
      <label>
        Qualified:
        <input type="checkbox" name="is_qualified" checked={lead.is_qualified} onChange={handleChange} />
      </label>
      <button type="submit">{leadData ? "Update Lead" : "Create Lead"}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default LeadForm;
