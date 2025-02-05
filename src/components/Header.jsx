import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import MonthContext from "../context/MonthContext";
import SearchContext from "../context/SearchContext";

function Header() {
  const navigate = useNavigate();
  const { month, setMonth } = useContext(MonthContext);
  const { search, setSearch } = useContext(SearchContext);

  const location = useLocation();

  const buttons = [
    { label: "Table", path: "", color: "success" },
    { label: "Statistics", path: "stats", color: "success" },
    { label: "Bar Chart", path: "bar-graph", color: "success" },
    { label: "Pie Chart", path: "pie-chart", color: "success" },
  ];

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: new Date(0, index).toLocaleString("en-US", { month: "long" }),
  }));

  console.log(location);

  return (
    <div className=" min-w-5xl flex flex-col gap-4 px-6 py-4">
      <div className="flex justify-between items-center w-full">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {location.pathname === "/data" && (
            <TextField
              placeholder="Search transaction"
              variant="outlined"
              size="small"
              sx={{
                maxWidth: 300,
                bgcolor: "rgba(252, 211, 77, 0.8)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(252, 211, 77, 0.8)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(252, 211, 77, 0.8)",
                  },
                },
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              label="Select Month"
              sx={{
                bgcolor: "rgba(252, 211, 77, 0.8)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(252, 211, 77, 0.8)",
                },
              }}
            >
              {months.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {buttons.map(({ label, path, color }) => (
          <Button
            key={path}
            variant="contained"
            color={color}
            onClick={() => navigate(path)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Header;
