import React, { useState, useMemo, useContext } from "react";
import { useGetBarChartData } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Card,
  Typography,
  Box,
} from "@mui/material";
import MonthContext from "../context/MonthContext";

function BarChartComponent() {
  //   const [monthId, setMonthId] = useState(1);
  const { month, setMonth } = useContext(MonthContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ["barChart", month],
    queryFn: () => useGetBarChartData(month),
    staleTime: Infinity,
    enabled: !!month,
  });

  //   const countsArray = useMemo(
  //     () => data?.data?.map((item) => item.count) || [],
  //     [data]
  //   );

  console.log(data);
  const countsArray = data?.data?.map((item) => item.count) || [];
  console.log(countsArray);

  const priceRanges = [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901-above",
  ];

  return (
    <Box className="flex justify-center items-center w-full">
      <Card className="flex flex-col items-center justify-center p-6 shadow-md rounded-lg bg-white w-full max-w-3xl">
        <Typography variant="h6" className="font-semibold mb-4">
          Sales Transactions by Price Range
        </Typography>

        {isLoading && <CircularProgress />}

        {error && <Alert severity="error">Failed to load data.</Alert>}

        {!isLoading && !error && countsArray.length > 0 ? (
          <BarChart
            width={800}
            height={350}
            series={[{ data: countsArray, label: "Sales", color: "#3b82f6" }]}
            xAxis={[{ data: priceRanges, scaleType: "band" }]}
          />
        ) : (
          !isLoading && (
            <Typography color="textSecondary">No data available.</Typography>
          )
        )}
      </Card>
    </Box>
  );
}

export default BarChartComponent;
