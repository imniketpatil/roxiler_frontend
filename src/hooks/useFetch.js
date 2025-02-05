import axios from "axios";
import client_url from "../utils/config";

const useGetProducts = async (id, search, page, perPage) => {
  try {
    const response = await axios.get(`${client_url}/products/get-product`, {
      params: { month: id, search, page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const useGetBarChartData = async (id) => {
  try {
    const response = await axios.get(
      `${client_url}/products/get-piechart-data`,
      {
        params: { month: id },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const useGetPieChartData = async (id) => {
  try {
    const response = await axios.get(
      `${client_url}/products/get-barchart-data`,
      {
        params: { month: id },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const useGetStatsData = async (id) => {
  try {
    const response = await axios.get(`${client_url}/products/get-stats`, {
      params: { month: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const useGetStatisticsData = async (id) => {
  // if (!id) id = 3;
  // console.log(id);

  try {
    const response = await axios.get(`${client_url}/products/get-stats`, {
      params: { month: id },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

const useGetStart = async () => {
  try {
    const response = await axios.get(`${client_url}/products/addDataToDB`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

export {
  useGetProducts,
  useGetBarChartData,
  useGetPieChartData,
  useGetStatsData,
  useGetStatisticsData,
  useGetStart,
};
