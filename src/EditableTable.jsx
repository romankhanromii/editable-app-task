import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editable.css";

const EditableTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/data");
      setData(response.data);
      setLoading(false);
      toast.success("Data fetched successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error fetching data");
    }
  };

  const handleAddRow = async () => {
    try {
      const newRow = { column1: "New Value", column2: "New Value" };
      const response = await axios.post("http://localhost:3001/data", newRow);
      setData([...data, response.data]);
      toast.success("Row added successfully");
    } catch (error) {
      toast.error("Error adding row");
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/data/${id}`);
      setData(data.filter((row) => row.id !== id));
      toast.success("Row deleted successfully");
    } catch (error) {
      toast.error("Error deleting row");
    }
  };

  const handleUpdateRow = async (id, updatedRow) => {
    try {
      await axios.put(`http://localhost:3001/data/${id}`, updatedRow);
      const updatedData = data.map((row) => {
        if (row.id === id) {
          return { ...row, ...updatedRow };
        }
        return row;
      });
      setData(updatedData);
      toast.success("Row updated successfully");
    } catch (error) {
      toast.error("Error updating row");
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Make sure ToastContainer is properly imported */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  value={row.column1}
                  onChange={(e) => {
                    const updatedValue = e.target.value;
                    setData((prevData) =>
                      prevData.map((prevRow) =>
                        prevRow.id === row.id
                          ? { ...prevRow, column1: updatedValue }
                          : prevRow
                      )
                    );
                  }}
                />
              </td>
              <td>
                <input
                  value={row.column2}
                  onChange={(e) => {
                    const updatedValue = e.target.value;
                    setData((prevData) =>
                      prevData.map((prevRow) =>
                        prevRow.id === row.id
                          ? { ...prevRow, column2: updatedValue }
                          : prevRow
                      )
                    );
                  }}
                />
              </td>
              <td>
                <button
                  className="table-button"
                  onClick={() => handleUpdateRow(row.id, row)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAddRow}>
        Add New Row
      </button>
    </div>
  );
};

export default EditableTable;
