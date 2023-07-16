import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useDataProvider } from "react-admin";
import { PieChart, Pie, Cell } from "recharts";
import Typography from "@mui/material/Typography";

const ContractPieChart = () => {
  const [data2, setData] = React.useState({
    _id: "jobReport",
    totalSubmittedSmartContracts: 6,
    totalApiCalls: 250,
    sumBidsAmounts: 250,
    numberOfPaidJobs: 4,
    inuseSmartContracts: 4,
    lockApiCalls: 168,
  });
  const dataProvider = useDataProvider();

  /* 
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/submittedplutusscripts",
        { filter: { queryType: "developers" } },
        "GET"
      )
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);
 */

  const data1 = [
    { name: "Inuse smart contracts", value: data2.inuseSmartContracts },
    {
      name: "Inactive smart contracts",
      value: data2.totalSubmittedSmartContracts - data2.inuseSmartContracts,
    },
  ];
  const data = [
    { name: "Lock asset api calls", value: data2.lockApiCalls },
    {
      name: "Unlock asset api calls",
      value: data2.totalApiCalls - data2.lockApiCalls,
    },
  ];
  const COLORS = ["#0088FE", "#FF8042"];
  const COLORS1 = ["#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Your plutus scripts & Api calls"
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={
          <Typography variant="subtitle2" gutterBottom>
            {`Total smart contracts: ${data2.totalSubmittedSmartContracts},Inuse smart contracts: ${data2.inuseSmartContracts}, Lock asset api calls: ${data2.totalApiCalls}, Unlock asset api calls: ${data2.lockApiCalls}`}
          </Typography>
        }
      />
      <CardContent>
        <div
          style={{
            width: "100%",
            height: 300,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data1}
                cx="25%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Pie
                data={data}
                cx="75%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractPieChart;
