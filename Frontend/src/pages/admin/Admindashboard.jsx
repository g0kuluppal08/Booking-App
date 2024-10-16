import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import ShowAllBookings from "./ShowAllBookings.jsx";
import AddNewCourt from "./AddNewCourt.jsx";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="admin dashboard tabs"
        centered
      >
        <Tab label="Show Bookings" />
        <Tab label="Create Court" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 4 }}>
        {activeTab === 0 && (
          <Box>
            <ShowAllBookings />
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <AddNewCourt />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
