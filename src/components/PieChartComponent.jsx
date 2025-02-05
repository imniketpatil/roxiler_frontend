import React, { useState, useMemo, useContext } from "react";
import { useGetPieChartData, useGetStatsData } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "@mui/x-charts";
import { CircularProgress, Typography, Card } from "@mui/material";
import MonthContext from "../context/MonthContext";

function PieChartComponent() {
  const { month, setMonth } = useContext(MonthContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ["PieChart", month],
    queryFn: () => useGetPieChartData(month),
    staleTime: Infinity,
    enabled: !!month,
  });

  const chartData = useMemo(() => {
    return Array.isArray(data?.data)
      ? data.data.map((item, index) => ({
          id: index,
          value: item.count,
          label:
            item.category?.charAt(0).toUpperCase() + item.category.slice(1),
        }))
      : [];
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="flex flex-col items-center justify-center p-6 shadow-md rounded-lg bg-white w-full max-w-md mx-auto">
        <Typography variant="h6" className="font-semibold mb-4">
          Monthly Transactions
        </Typography>

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Failed to load data.</Typography>
        ) : chartData.length > 0 ? (
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 50,
                outerRadius: 100,
                cx: 170,
                cy: 150,
              },
            ]}
            width={350}
            height={350}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
              },
            }}
          />
        ) : (
          <Typography color="textSecondary">No data available.</Typography>
        )}
      </Card>
    </div>
  );
}

export default PieChartComponent;
