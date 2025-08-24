import React, { useState } from "react";

const LeadFilter = ({ onApplyFilter }) => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      email: email || undefined,
      company: company || undefined,
      status: status || undefined,
      source: source || undefined,
    };
    onApplyFilter(filters);
  };

  const handleReset = () => {
    setEmail("");
    setCompany("");
    setStatus("");
    setSource("");
    onApplyFilter({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Email contains..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Company contains..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: "10px" }}>
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="lost">Lost</option>
        <option value="won">Won</option>
      </select>
      <select value={source} onChange={(e) => setSource(e.target.value)} style={{ marginRight: "10px" }}>
        <option value="">All Sources</option>
        <option value="website">Website</option>
        <option value="facebook_ads">Facebook Ads</option>
        <option value="google_ads">Google Ads</option>
        <option value="referral">Referral</option>
        <option value="events">Events</option>
        <option value="other">Other</option>
      </select>
      <button type="submit" style={{ marginRight: "10px" }}>Apply Filter</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default LeadFilter;
