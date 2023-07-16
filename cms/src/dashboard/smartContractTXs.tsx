import * as React from "react";
import {
  useTranslate,
  useGetList,
  ReferenceField,
  TextField,
  FunctionField,
} from "react-admin";

import CardWithIcon from "./cardWithIcon";
import GradingIcon from "@mui/icons-material/Grading";
import { subDays } from "date-fns";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
interface Props {
  lockedTxs: number;
  unlockedTxs: number;
}

const SmartContractTxs = (props: Props) => {
  const { lockedTxs = 0, unlockedTxs = 0 } = props;

  const text = {
    color: "orange",
  };

  const { isLoading, data: plutustxs } = useGetList<any>("plutustxs", {
    filter: {},
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 8 },
  });

  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/plutustxs"
      icon={GradingIcon}
      title="Smart contract API calls"
      subtitle={`${lockedTxs} locked TXs, ${unlockedTxs} unlocked TXs`}
    >
      <List sx={{ display: isLoading ? "none" : "block" }}>
        {plutustxs
          ? plutustxs.map((record: any) => (
              <>
                <ListItem key={record.id}>
                  <ListItemAvatar>
                    <PaymentsOutlinedIcon></PaymentsOutlinedIcon>
                  </ListItemAvatar>
                  <ReferenceField
                    record={record}
                    source="smartContractId"
                    reference="contracts"
                    link={false}
                  >
                    <FunctionField
                      render={(plutusTx: any) => (
                        <TextField record={plutusTx} source="name" />
                      )}
                    />
                  </ReferenceField>
                </ListItem>
                <ListItem
                  key={record.id + 1}
                  button
                  component={Link}
                  to={`/plutustxs/?filter=${JSON.stringify({
                    _id: record.id,
                  })}`}
                  alignItems="center"
                >
                  <Tooltip title={record.lockedTxHash}>
                    <ListItemText primaryTypographyProps={{ style: text }}>
                      Lock Tx
                    </ListItemText>
                  </Tooltip>
                  <Tooltip title={record.unlockedTxHash || ""}>
                    <ListItemText primaryTypographyProps={{ style: text }}>
                      {record.unlockedTxHash ? "Unlock Tx" : "UnPaid"}
                    </ListItemText>
                  </Tooltip>
                  <Box>{record.amount} Ada</Box>
                </ListItem>
              </>
            ))
          : null}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/plutustxs"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allPlutusTxs")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default SmartContractTxs;
