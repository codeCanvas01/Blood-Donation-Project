import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getOrg = async () => {
      try {
        if (user?.role === "donar") {
          const { data } = await API.get("/inventory/get-orgnaisation");
          if (data?.success) {
            setData(data?.organisations);
          }
        }
        if (user?.role === "hospital") {
          const { data } = await API.get(
            "/inventory/get-orgnaisation-for-hospital"
          );
          if (data?.success) {
            setData(data?.organisations);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrg();
  }, [user]);

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
              <TableCell>{record.organisationName}</TableCell>
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

export default OrganisationPage;
