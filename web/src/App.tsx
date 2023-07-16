import * as React from "react";
import { Admin, CustomRoutes, Resource, fetchUtils } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";
import { authProvider } from "ra-nest-rest";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";
import Configuration from "./configuration/Configuration";
import dataProvider from "ra-nest-rest";
import FetchGithub from "./tools/fetchGithub";
import FetchCardano from "./tools/fetchCardano";
import ParseAddress from "./tools/parseAddress";
import Wallet from "./wallet/wallet";
import SmartContracts from "./smartcontracts/meshJs";
import { MeshProvider } from "@meshsdk/react";
import plutustxs from "./plutustxs";
import { ContractReports } from "./contractreports";
import { ApiCallReports } from "./apicallreports";
import ChangePassword from "./components/changePassword";
import plutustscripts from "./plutustscripts";
import yourplutustscripts from "./yourplutustscripts";
import Typography from "@mui/material/Typography";

const loginUrl = process.env.REACT_APP_LOGIN_URL;
const apiUrl = process.env.REACT_APP_API_URL;
const renewTokenUrl = process.env.REACT_APP_RENEW_ACCESS_TOKEN_URL;
const logoutUrl = process.env.REACT_APP_LOGOUT_URL;
const _authProvider = authProvider(loginUrl, renewTokenUrl, logoutUrl);
const restProvider = dataProvider(apiUrl);

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const App = () => {
  return (
    <MeshProvider>
      <Admin
        title="bWorks"
        dataProvider={restProvider}
        authProvider={_authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={lightTheme}
      >
        <CustomRoutes>
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/fetchcardano" element={<FetchCardano />} />
          <Route path="/fetchgithub" element={<FetchGithub />} />
          <Route path="/wallets" element={<Wallet />} />
          <Route path="/verifySmartContract" element={<SmartContracts />} />
          <Route path="/parseaddress" element={<ParseAddress />} />
          <Route path="/scontractreports" element={<ContractReports />} />
          <Route path="/apicallreports" element={<ApiCallReports />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          ParseAddress
        </CustomRoutes>
        <Resource name="plutusscripts" {...plutustscripts} />
        <Resource name="plutustxs" {...plutustxs} />
        <Resource name="contracts" {...yourplutustscripts} />
      </Admin>
      <Typography
        variant="subtitle2"
        align="left"
        color="orange"
        sx={{ position: "fixed", right: 0, bottom: 10, left: 10, zIndex: 100 }}
      >
        @ {new Date().getFullYear()} Built on Cardano <br/>
      </Typography>
   
    </MeshProvider>
  );
};

export default App;
