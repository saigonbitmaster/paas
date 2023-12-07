import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  useDataProvider,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const CreateScreen = () => {
  const [token, setToken] = React.useState(null);
  const dataProvider = useDataProvider();

  dataProvider
    .customMethod("auth/accesstoken", { filter: {} }, "GET")
    .then((result) => setToken(result.data))
    .catch((error) => console.error(error));

  if (!token) return null;
  return (
    <Create redirect="list">
      <SimpleForm>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={6} xl={4}>
            <TextInput source="name" fullWidth required />
          </Grid>
          <Grid item md={12} />

          <Grid item xs={12} md={12} lg={8} xl={6}>
            <TextInput
              source="token"
              fullWidth
              required
              disabled
              defaultValue={token}
            />
          </Grid>
          <Grid item md={12} />

          <Grid item md={12} />
          <Grid item xs={12} md={12} lg={8} xl={6}>
            <DateTimeInput source="expire" required defaultValue={new Date()} />
          </Grid>
          <Grid item md={12} />

          <Grid item xs={12} md={12} lg={8} xl={6}>
            <RichTextInput source="description" fullWidth />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
export default CreateScreen;
