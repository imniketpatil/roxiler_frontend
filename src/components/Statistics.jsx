import React, { useContext, useState } from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useGetStatisticsData, useGetStatsData } from "../hooks/useFetch.js";
import MonthContext from "../context/MonthContext";

function Statistics() {
  const { month, setMonth } = useContext(MonthContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ["Statistics", month],
    queryFn: () => useGetStatisticsData(month),
    // staleTime: Infinity,
  });

  console.log(data);

  if (isLoading) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: "center", mt: 3 }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>
        Error: {error.message}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>
        Error: Missing Data
      </Typography>
    );
  }

  const stats = [
    {
      icon: (
        <AttachMoneyRoundedIcon
          fontSize="large"
          sx={{ color: "success.main" }}
        />
      ),
      title: "Total Sale Amount",
      value: `$${data.data.totalSaleAmount}`,
    },
    {
      icon: (
        <DoneOutlineRoundedIcon
          fontSize="large"
          sx={{ color: "primary.main" }}
        />
      ),
      title: "Total Sold Items",
      value: data.data.totalSoldItems,
    },
    {
      icon: <ClearRoundedIcon fontSize="large" sx={{ color: "error.main" }} />,
      title: "Total Unsold Items",
      value: data.data.totalUnsoldItems,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="text.primary"
        gutterBottom
      >
        Sales Dashboard
      </Typography>

      <Grid container spacing={3} direction="row">
        {stats.map((stat, index) => (
          <Grid item xs={12} key={index}>
            <StatCard icon={stat.icon} title={stat.title} value={stat.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: "50%" }}>
            {icon}
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Statistics;
