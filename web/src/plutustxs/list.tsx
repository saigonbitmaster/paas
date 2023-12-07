import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceOneField,
  useDataProvider,
  FunctionField,
  NumberField,
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

//https://preprod.cardanoscan.io/transaction/ce3862f63580d1a50ff6c121b380e52967c68fcb9af16b746d9112de1ded2c64
const preprodUrl = "https://cardanoscan.io/transaction/";
const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "DESC" }}
      resource="plutustxs"
      filter={{ queryType: "developer" }}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />

        <FunctionField
          label="Is unlocked"
          render={(record) => (
            <Checkbox disabled checked={!!record.unlockedTxHash} />
          )}
        />

        <FunctionField
          label="Lock TxHash"
          render={(record) => (
            <Link href={`${preprodUrl}${record.lockedTxHash}`} target="_blank">
              {record.lockedTxHash}
            </Link>
          )}
        />

        <NumberField source="amount" label="Amount (Ada)" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <FunctionField
          label="Unlock TxHash"
          render={(record) => (
            <Link
              href={`${preprodUrl}${record.unlockedTxHash}`}
              target="_blank"
            >
              {record.unlockedTxHash}
            </Link>
          )}
        />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
