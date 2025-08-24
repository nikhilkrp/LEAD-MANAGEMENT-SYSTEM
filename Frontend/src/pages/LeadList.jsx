import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import LeadFilter from "./LeadFilter";
import LeadForm from "./LeadForm";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const LeadList = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [editingLead, setEditingLead] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchLeads = async () => {
    try {
      const params = { page, limit: 20, ...filters };
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/leads`,
        { params, withCredentials: true }
      );
      setRowData(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching leads:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, filters]);



  const handleCreateOrEdit = async (lead) => {
    try {
      if (editingLead) {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/leads/${lead._id}`,
          lead,
          { withCredentials: true }
        );
        setRowData((prev) =>
          prev.map((l) => (l._id === res.data._id ? res.data : l))
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/leads`,
          lead,
          { withCredentials: true }
        );
        setRowData((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
      setEditingLead(null);

    } catch (error) {
      console.error("Create/Edit error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/leads/${id}`,
        { withCredentials: true }
      );
      setRowData((prev) => prev.filter((l) => l._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  const columns = [
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Company", field: "company" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div>
          <button onClick={() => { setEditingLead(params.data); setShowForm(true); }}>Edit</button>
          <button onClick={() => handleDelete(params.data._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <button onClick={() => { setEditingLead(null); setShowForm(true); }} >Create Lead</button>
      {showForm && (
        <LeadForm
          onSubmit={handleCreateOrEdit}
          leadData={editingLead}
          onCancel={() => setShowForm(false)}
        />
      )}
      <LeadFilter onApplyFilter={setFilters} />
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination
          paginationPageSize={20}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev </button>
        <span style={{ margin: "0 10px" }}>{page} / {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} > Next </button>
      </div>
    </div>
  );
};

export default LeadList;

