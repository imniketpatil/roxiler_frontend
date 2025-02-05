import "./App.css";
import BarChartComponent from "./components/BarChart";
import HomePage from "./components/HomePage";
import PieChartComponent from "./components/PieChartComponent";
import Statistics from "./components/Statistics";
import TransactionTable from "./components/TransactionTable";
import Table from "./components/TransactionTable";
import Layout from "./Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/data",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <TransactionTable />,
        },
        {
          path: "pie-chart",
          element: <PieChartComponent />,
        },
        {
          path: "bar-graph",
          element: <BarChartComponent />,
        },
        {
          path: "stats",
          element: <Statistics />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
