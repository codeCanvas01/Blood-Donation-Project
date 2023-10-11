import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, FormControl, InputLabel, MenuItem, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import API from "./../../../services/API";
const Modal = () => {
  const [open, setOpen] = useState(false);
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
       
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
     
      window.location.reload();
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={handleModalOpen}>Open Modal</Button>

      {/* Modal */}
      <Dialog open={open} onClose={handleModalClose} maxWidth="xs" fullWidth>
        <DialogTitle>Manage Blood Record</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <RadioGroup
              row
              name="inventoryType"
              value={inventoryType}
              onChange={(e) => setInventoryType(e.target.value)}
            > 
              
              
              <FormControlLabel
           
                value="in"
                control={<Radio />}
                label="IN"
              />
              <FormControlLabel
                value="out"
                control={<Radio />}
                label="OUT"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="bloodGroup-label"> Choose Blood Group</InputLabel>
            <Select
              labelId="bloodGroup-label"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Donar Email"
            id="donarEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Quantity (ML)"
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} className="btn">
            Close
          </Button>
          <Button onClick={handleModalSubmit} className="btn">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
