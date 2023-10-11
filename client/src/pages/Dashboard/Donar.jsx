import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Donar = () => {
  const [data, setData] = useState([]);

  // Find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data?.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((record) => (
            <TableRow key={record._id}>
              <TableCell>
                {record.name || record.organisationName + " (ORG)"}
              </TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.phone}</TableCell>
              <TableCell>
                {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default Donar;
