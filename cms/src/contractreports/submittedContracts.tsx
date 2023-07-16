import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useTranslate, useDataProvider } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";
import { submittedSmartContracts } from "./sampleData";

const SubmittedSmartContract = (props) => {
  /* 
  const dataProvider = useDataProvider();
  const [submittedSmartContracts, setSubmittedSmartContracts] = React.useState([]);
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlyjobreport",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setSubmittedSmartContracts(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []); 
   */

  const translate = useTranslate();
  const headers = [
    { key: "_id", name: "Month" },
    { key: "submittedSmartContracts", name: "Submitted smart contracts" },
    { key: "inuseSmartContracts", name: "Inuse smart contracts" },
    { key: "sumAssetAmounts", name: "Sum asset transactions amounts (M $Ada)" },
    { key: "numberLockApiCalls", name: "Lock Api calls" },
    { key: "numberUnlockApiCalls", name: "Unlock api calls" },
  ];
  return (
    <CardWithIcon
      to={{
        pathname: "/postjobs",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title={translate("pos.dashboard.submittedSmartContracts")}
      subtitle={`Last 12 months submitted smart contracts`}
    >
      <Table headers={headers} data={submittedSmartContracts}></Table>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/plutustscripts"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allSmartContract")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default SubmittedSmartContract;
