import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useGetProducts } from "../hooks/useFetch";
import MonthContext from "../context/MonthContext";
import SearchContext from "../context/SearchContext";

export default function TransactionTable() {
  const { month, setMonth } = React.useContext(MonthContext);
  const { search, setSearch } = React.useContext(SearchContext);

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["Products", month, search, page, perPage],
    queryFn: () => useGetProducts(month, search, page, perPage),
    staleTime: Infinity,
  });

  console.log(data);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  return (
    <Box sx={{ p: 3, bgcolor: "#F9FAFB", minHeight: "contained" }}>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Product Transactions
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#007FFF" }}>
                {[
                  "ID",
                  "Title",
                  "Description",
                  "Price",
                  "Category",
                  "Sold",
                  "Image",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.transactions?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#F3F4F6" },
                    "&:hover": { bgcolor: "#E0F7FA" },
                  }}
                >
                  <TableCell align="center">{transaction.id}</TableCell>
                  <TableCell align="center">{transaction.title}</TableCell>
                  <TableCell align="center">
                    {transaction.description.substring(0, 50)}
                  </TableCell>
                  <TableCell align="center">${transaction.price}</TableCell>
                  <TableCell align="center">{transaction.category}</TableCell>
                  <TableCell align="center">
                    {transaction.sold ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      width={40}
                      height={40}
                      style={{ borderRadius: "5px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Page: <strong>{page}</strong>
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= data.totalPages}
            >
              Next
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Per Page: {perPage}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
