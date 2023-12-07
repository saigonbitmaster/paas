import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  useRecordContext,
  FunctionField,
} from "react-admin";
import Button from "@mui/material/Button";

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      resource="accesstokens"
      hasCreate={true}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <FunctionField
          label="Token"
          render={(record) => (
            <span
              style={{
                width: 700,
                display: "inline-block",
                wordWrap: "break-word",
              }}
            >
              {record.token}
            </span>
          )}
        />

        <DateField source="expire" label="Expired at" showTime />
        <Button>Delete</Button>
      </Datagrid>
    </List>
  );
};

export default ListScreen;
