import React, { useEffect } from "react";
import {
    Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import TableView from "./TableView";
import { orderAPI } from "../apis/orderAPI";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState("");
  const [rateHour, setRateHour] = useState("");
  const [supplier, setSupplier] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [description, setDescription] = useState("");
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState([]);
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [toast, setToast] = useState({
    status: false,
    message: "",
    type: "",
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  useEffect(() => {
    orderAPI.getSuppliers().then((data) => {
      setSuppliersOptions([...data]);
    });
    return () => setSuppliersOptions([]);
  }, []);

  const getPurchaseOrder = (supplier) => {
    orderAPI.getPurchaseOrder({ payload: supplier }).then((data) => {
      setPurchaseOrderOptions([...data]);
    });
  };

  const getDescription = (purchaseOrder) => {
    orderAPI.getDescription({ payload: purchaseOrder }).then((data) => {
      setDescriptionOptions([...data]);
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    let payload = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      hours: hours,
      rateHour: rateHour,
      supplier: supplier,
      purchaseOrder: purchaseOrder,
      description: description,
      userInitiated: true,
    };
    orderAPI.addOrder(payload).then((data) => {
      if (data.length) {
        setRows([...data]);
        setToast({
          status: true,
          message: "Data added successfully",
          type: "success",
        });
        setLoading(false);
        setOpen(false);
        setName("");
        setSupplier("");
        setDescription("");
        setPurchaseOrder("")
      } else {
        setLoading(false);
        setToast({
          status: true,
          message: "Something went wrong...",
          type: "error",
        });
      }
    });
  };

  const handleCloseToast = () => {
    setToast({
        status: false,
        message: "",
        type: "",
      });
  }

  return (
    <>
    {toast.status && (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toast.status}
            autoHideDuration={5000}
            onClose={handleCloseToast}
            key={"toast"}
        >
            <Alert onClose={handleCloseToast} severity={toast.type} sx={{ width: '100%' }}>
                {toast.message}
            </Alert>
        </Snackbar>
    )}
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">Order Details</Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ float: "right" }}
            onClick={handleOpen}
          >
            <AddShoppingCartIcon />
            Add orders
          </Button>
        </Stack>
        <Box
          sx={{
            paddingTop: 3,
          }}
        >
          <TableView rows={rows} />
        </Box>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack direction={"column"} spacing={2}>
                <Typography variant="h5">Add order details</Typography>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography>Start time</Typography>
                <TextField
                  type="date"
                  id="standard-basic"
                  label=""
                  variant="standard"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Typography>End time</Typography>
                <TextField
                  type="date"
                  id="standard-basic"
                  label=""
                  variant="standard"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="No. of hours worked"
                  variant="standard"
                  onChange={(e) => setHours(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Rate per hour"
                  variant="standard"
                  onChange={(e) => setRateHour(e.target.value)}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={suppliersOptions}
                  value={supplier}
                  onChange={(e, selectedOption) => {
                    setSupplier(selectedOption);
                    getPurchaseOrder(selectedOption);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select supplier"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={purchaseOrderOptions}
                  value={purchaseOrder}
                  onChange={(e, selectedOption) => {
                    setPurchaseOrder(selectedOption);
                    getDescription(selectedOption);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Purchase order"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={descriptionOptions}
                  value={description}
                  onChange={(e, selectedOption) => {
                    setDescription(selectedOption);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Description"
                      variant="standard"
                    />
                  )}
                />
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    sx={{
                      float: "right",
                    }}
                    disabled={!supplier && !purchaseOrder && !description}
                  >
                    {loading ? <CircularProgress /> : "Submit"}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
