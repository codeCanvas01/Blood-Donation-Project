import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddInventory = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <Button
              variant="contained"
              color="success"
              onClick={handleAddInventory}
              sx={{ my: 4 }}
            >
              Add Inventory
            </Button>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Inventory Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Donor Email</TableCell>
                  <TableCell>Time & Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.bloodGroup}</TableCell>
                    <TableCell>{record.inventoryType}</TableCell>
                    <TableCell>{record.quantity} (ML)</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {modalOpen && <Modal onClose={handleModalClose} />}
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
