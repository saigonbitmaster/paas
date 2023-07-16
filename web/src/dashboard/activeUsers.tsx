import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomerIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useTranslate } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./cardWithIcon";

interface Props {
  developerUsers: number;
  serviceUsers: number;
}

const ActiveUsers = (props: Props) => {
  const { developerUsers = 100, serviceUsers = 100 } = props;
  const translate = useTranslate();

  return (
    <CardWithIcon
      to="/users"
      icon={CustomerIcon}
      title="Active users"
      subtitle={`${developerUsers} Plutus developers, ${serviceUsers} Service subscribers`}
    ></CardWithIcon>
  );
};

export default ActiveUsers;
