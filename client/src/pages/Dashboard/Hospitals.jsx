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

const Hospitals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const { data } = await API.get("/inventory/get-hospitals");
        if (data?.success) {
          setData(data?.hospitals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHospitals();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((record) => (
            <TableRow key={record._id}>
              <TableCell>{record.hospitalName}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.phone}</TableCell>
              <TableCell>{record.address}</TableCell>
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

export default Hospitals;
