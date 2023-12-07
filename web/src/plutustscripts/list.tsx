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

const ListScreen = () => {
  const JobPanel = () => {
    const record = useRecordContext();
    const _record = {
      name: record.name,
      address: record.address,
      cboHex: record.cborhex.slice(0, 50),
    };
    return (
      <>
        <TextField record={record} source="gitLink" />
        <strong>Contract cboHex: </strong>
        <FunctionField
          record={record}
          render={(record) => (
            <span
              style={{
                width: 1400,
                display: "inline-block",
                wordWrap: "break-word",
              }}
            >
              {record.cborhex}
            </span>
          )}
        />
        <div dangerouslySetInnerHTML={{ __html: record.description }} />
        <strong>Get contract script: </strong>
        <FunctionField
          render={(record) =>
            `curl -X 'GET' 'https://paas.bworks.app/api/contracts/${record._id}' -H "Accept: application/json" -H "Authorization: Bearer {token}"`
          }
        />
        <br />
        <strong>Return: </strong>
        <FunctionField render={(record) => `${JSON.stringify(_record)}`} />
      </>
    );
  };

  const [record, setRecord] = React.useState(null);

  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      resource="contracts"
      hasCreate={false}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={rowClick}
        expand={<JobPanel />}
      >
        <TextField source="name" />
        <TextField source="address" />
        <ReferenceField source="author" reference="users">
          <TextField source="fullName" />
        </ReferenceField>
        <TextField source="language" label="Written in" />
        <NumberField source="submittedUsers" label="Subscribers" />
        <DateField source="createdAt" label="Submitted at" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
