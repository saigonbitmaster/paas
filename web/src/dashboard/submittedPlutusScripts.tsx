import * as React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useGetList, useTranslate, TextField, DateField } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { calledPlutusTxs } from "./sampleData";
import LinkTx from "../components/linkTXs";
const text = {
  color: "orange",
};

const Spacer = () => <span style={{ width: "3em" }} />;

const SubmittedPlutusScripts = (props) => {
  const { postedContracts = 0, inuseContracts = 0 } = props;

  const translate = useTranslate();
  const { data: contracts, total } = useGetList<any>("contracts", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 8 },
  });

  const display = "block";

  return (
    <CardWithIcon
      to={{
        pathname: "/plutusscripts",
        search: stringify({
          filter: JSON.stringify({}),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title="Smart contracts"
      subtitle={`${postedContracts} Registered scripts, ${inuseContracts} Published scripts`}
    >
      <List sx={{ display }}>
        {contracts?.map((record: any, index: number) => (
          <>
            <ListItem key={record.id} alignItems="center">
              <ListItemAvatar>
                <AppRegistrationOutlinedIcon></AppRegistrationOutlinedIcon>
              </ListItemAvatar>
              <TextField record={record} source="name"></TextField>
              <Spacer />
              <DateField record={record} source="createdAt"></DateField>
            </ListItem>

            <ListItem
              key={record.id + 1}
              button
              component={Link}
              to="/plutustxs"
              alignItems="flex-start"
            >
              <ListItemText primaryTypographyProps={{ style: text }}>
                Submitted TXs
              </ListItemText>
              <LinkTx total={calledPlutusTxs[index]} />
            </ListItem>
          </>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/plutustscripts"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allSubmittedScripts")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default SubmittedPlutusScripts;
