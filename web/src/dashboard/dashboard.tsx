import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import SmartContracts from "./submittedPlutusScripts";
import ActiveUsers from "./activeUsers";
import SmartContractTxs from "./smartContractTXs";
import PaidByPlutus from "./paidByPlutus";
import ApiCallsChart from "./smartContractChart";
import PlutusTxsChart from "./plutusTXsChart";
import { useDataProvider } from "react-admin";
import {
  activeUsers,
  transactionAmounts,
  contractCardData,
  calledTxs,
} from "./sampleData";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  /* 
  const [dashBoardCardData, setDashBoardCardData] = React.useState({
    paidByPlutus: {
      numberOfJobs: 0,
      totalAmount: 0,
    },
    activeUsers: {
      jobSeekers: 0,
      employers: 0,
    },
    postedJobs: { postedJobs: 0, bids: 0 },
    plutusTxs: {
      lockTxs: 0,
      unlockTxs: 0,
    },
  });
  const dataProvider = useDataProvider();
  
  React.useEffect(() => {
    dataProvider
      .customMethod("public/dashboardcards", { filter: {} }, "GET")
      .then((result) => setDashBoardCardData(result.data))
      .catch((error) => console.error(error));
  }, []);
 */
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <PaidByPlutus
          lockedAmounts={transactionAmounts.lockedAmounts}
          unlockedAmounts={transactionAmounts.unlockedAmounts}
        />
        <VerticalSpacer />
        <SmartContractTxs
          lockedTxs={calledTxs.lockedTxs}
          unlockedTxs={calledTxs.unlockedTxs}
        />
        <VerticalSpacer />
        <ApiCallsChart />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.singleCol}></div>
      <div style={styles.flex}>
        <PaidByPlutus
          lockedAmounts={transactionAmounts.lockedAmounts}
          unlockedAmounts={transactionAmounts.unlockedAmounts}
        />
        <Spacer />
        <SmartContractTxs
          lockedTxs={calledTxs.lockedTxs}
          unlockedTxs={calledTxs.unlockedTxs}
        />
      </div>
      <div style={styles.singleCol}>
        <ApiCallsChart />
      </div>
      <div style={styles.singleCol}>
        <PlutusTxsChart />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <PaidByPlutus
              lockedAmounts={transactionAmounts.lockedAmounts}
              unlockedAmounts={transactionAmounts.unlockedAmounts}
            />
            <Spacer />
            <ActiveUsers
              developerUsers={activeUsers.developerUsers}
              serviceUsers={activeUsers.serviceUsers}
            />
          </div>
          <div style={styles.singleCol}>
            <ApiCallsChart />
          </div>
          <div style={styles.singleCol}>
            <PlutusTxsChart />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <SmartContracts
              postedContracts={contractCardData.postedContracts}
              inuseContracts={contractCardData.inuseContracts}
            />
            <Spacer />
            <SmartContractTxs
              lockedTxs={calledTxs.lockedTxs}
              unlockedTxs={calledTxs.unlockedTxs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
