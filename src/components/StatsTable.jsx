import React from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Card, CardContent, Typography, Box } from "@mui/material";

function StatsTable({ data }) {
  if (
    !data ||
    !data.totalSaleAmount ||
    !data.totalSoldItems ||
    !data.totalUnsoldItems
  ) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>
        Error: Missing or Invalid Data
      </Typography>
    );
  }

  console.log(data);

  const stats = [
    {
      icon: (
        <AttachMoneyRoundedIcon
          fontSize="large"
          sx={{ color: "success.main" }}
        />
      ),
      title: "Total Sale Amount",
      value: `$${data.totalSaleAmount}`,
    },
    {
      icon: (
        <DoneOutlineRoundedIcon
          fontSize="large"
          sx={{ color: "primary.main" }}
        />
      ),
      title: "Total Sold Items",
      value: data.totalSoldItems,
    },
    {
      icon: <ClearRoundedIcon fontSize="large" sx={{ color: "error.main" }} />,
      title: "Total Unsold Items",
      value: data.totalUnsoldItems,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="text.primary"
        gutterBottom
      >
        Sales Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: "calc(50% - 24px)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StatCard icon={stat.icon} title={stat.title} value={stat.value} />
          </Box>
        ))}
      </Box>
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
        width: "100%",
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

export default StatsTable;
