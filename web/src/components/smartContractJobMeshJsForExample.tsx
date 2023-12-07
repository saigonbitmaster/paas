import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import {
  Edit,
  SimpleForm,
  SelectInput,
  TextInput,
  DateInput,
  ArrayInput,
  NumberInput,
  SimpleFormIterator,
  FormDataConsumer,
} from "react-admin";
import { useWatch } from "react-hook-form";

//Component for inline datum
export default function SmartContract(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //temporary disabled unlock tab to unlock by admin.
    /*  if (value === "1") {
      return;
    } */
    setValue(newValue);
  };

  const handleSmartContractChange = props.handleContractChange;
  const handleUnlockUserChange = props.handleUnlockUserChange;
  const selectedContract = props.contract?.selected || null;
  const selectedUnlockUser = props.unlockUsers?.selected || null;
  const contracts = props.contract?.contracts || [];
  const unlockUsers = props.unlockUsers?.unlockUsers || [];
  const plutusTxs = props.plutusTxs?.plutusTxs || [];
  const handlePlutusTxChange = props.handlePlutusTxChange || null;
  const selectedPlutusTx = props.plutusTxs?.selected || null;
  const sendAdaToPlutus = props.sendAdaToPlutus || null;
  const redeemAdaValues = props.redeemAdaValues || null;
  const handleChangeLockAda = props.handleChangeLockAda || null;
  const handleChangRedeemAda = props.handleChangRedeemAda || null;
  const redeemAdaFromPlutus = props.redeemAdaFromPlutus || null;
  const amountToLock = props.amountToLock || {};
  const txName = props.txName || "";
  const handleChangeTxName = props.handleChangeTxName || null;
  const datum = props.datum || {};
  const handleChangeUnlockPartner = props.handleChangeUnlockPartner || null;
  const unlockPartner = props.unlockPartner || "bworks";
  const handleChangePublicKeyHash = props.handleChangePublicKeyHash || null;
  const receiveAddress = props.receiveAddress || "";
  const handleReceiveAddressChange = props.handleReceiveAddressChange || null;

  if (!contracts || contracts.length === 0) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        {" "}
        No smart contract
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ bborderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="wallet actions">
            <Tab
              value="1"
              label="Send asset to smart contract"
              sx={{ padding: 0, marginLeft: 0 }} //to make underline of tab equal to text
            />
            <Tab
              value="2"
              label="Spend UTXO from Smart contract"
              sx={{ padding: 0, marginLeft: 3 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, marginLeft: 0 }}>
          <Box
            sx={{
              paddingTop: 0,
              paddingLeft: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, marginRight: 1 }}
              >
                <InputLabel id="simple-select-standard-label">
                  Select a smart contract
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedContract}
                  onChange={handleSmartContractChange}
                  label="contract"
                >
                  {contracts.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              variant="standard"
              disabled
              value={
                contracts.find((item) => item.id === selectedContract).address
              }
            />

            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="TX Name"
              variant="standard"
              value={txName}
              onChange={handleChangeTxName}
            />
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              type="number"
              value={amountToLock}
              onChange={handleChangeLockAda}
            />

            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              label="Datum PublicKeyHash"
              variant="standard"
              value={
                datum.publicKeyHash
                  ? datum.publicKeyHash
                  : "Selected unlock user has no wallet"
              }
              onChange={handleChangePublicKeyHash}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Datum Deadline"
                value={datum.deadline}
                onChange={props.handleChangeDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 500, p: 0 }} />
                )}
              />
            </LocalizationProvider>
            <SimpleForm toolbar={<> </>}>
              <ArrayInput source="items" label="More datum keys">
                <SimpleFormIterator inline>
                  <TextInput source="key" helperText={false} />

                  <SelectInput
                    source="type"
                    choices={[
                      { id: "number", name: "Number" },
                      { id: "string", name: "String" },
                      { id: "date", name: "Date" },
                    ]}
                  />
                  <TextInput source="value" helperText={false} fullWidth />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleForm>

            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={sendAdaToPlutus}
            >
              Submit
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: 0 }}>
          <Box
            sx={{
              paddingTop: 0,
              paddingLeft: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                marginLeft: 0,
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, marginRight: 1 }}
              >
                <InputLabel id="simple-select-standard-label">
                  Select a smart contract
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedContract}
                  onChange={handleSmartContractChange}
                  label="contract"
                >
                  {contracts.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="simple-select-standard-label">
                  Select a locked TX
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedPlutusTx}
                  onChange={handlePlutusTxChange}
                  label="contract"
                >
                  {plutusTxs.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Contract address"
              variant="standard"
              disabled
              value={
                contracts.find((item) => item.id === selectedContract).address
              }
            />
            <TextField
              sx={{ width: 480, fontSize: "small" }}
              id="standard-basic"
              label="Contract CborHex"
              disabled
              variant="standard"
              value={
                contracts.find((item) => item.id === selectedContract).cborhex
              }
            />

            <TextField
              sx={{ width: 480, fontSize: "small" }}
              id="standard-basic"
              label="Locked Tx hash"
              value={redeemAdaValues.lockedTxHash}
              onChange={handleChangRedeemAda("transactionIdLocked")}
              variant="standard"
              disabled
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              value={redeemAdaValues.amountToRedeem}
              onChange={handleChangRedeemAda("amountToRedeem")}
              type="number"
              disabled
            />

            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Receiver wallet address"
              variant="standard"
              value={receiveAddress}
              onChange={handleReceiveAddressChange}
            />
            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Transaction index"
              variant="standard"
              type="number"
              disabled
              value={redeemAdaValues.transactionIndxLocked}
              onChange={handleChangRedeemAda("transactionIndxLocked")}
            />

            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Fee"
              variant="standard"
              value={redeemAdaValues.manualFee}
              onChange={handleChangRedeemAda("manualFee")}
              disabled
            />
            <SimpleForm toolbar={<> </>}>
              <ArrayInput source="items" label="Create redeemer data">
                <SimpleFormIterator inline>
                  <TextInput source="key" helperText={false} />

                  <SelectInput
                    source="type"
                    choices={[
                      { id: "number", name: "Number" },
                      { id: "string", name: "String" },
                      { id: "date", name: "Date" },
                    ]}
                  />
                  <TextInput source="value" helperText={false} fullWidth />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleForm>
            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={redeemAdaFromPlutus}
            >
              Submit
            </Button>
          </Box>
        </TabPanel>
      </TabContext>

      <Typography
        variant="subtitle1"
        sx={{
          ml: 0,
          color: "green",
          ...(props.notification?.error === true && { color: "red" }),
        }}
      >
        {props.notification?.message}
      </Typography>

      <Divider textAlign="left" sx={{ width: 500, mt: 2 }}></Divider>
      <Typography
        variant="subtitle1"
        sx={{
          ml: 0,
          color: "#e65100",
        }}
      >
        Important notes
      </Typography>
      {value === "1" ? (
        <Typography
          variant="caption"
          sx={{
            ml: 0,
            color: "#ed6c02",
            width: 500,
            wordWrap: "break-word",
          }}
        >
          The transaction will be submit to Cardano mainnet: <br />
          1. Please make sure the correctly Datum before submit. <br />
          2. Try will small amount first. <br />
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{
            ml: 0,
            color: "#ed6c02",
          }}
        >
          Please verify with receiver its wallet address before submit the
          unlock transaction.
        </Typography>
      )}
    </Box>
  );
}
