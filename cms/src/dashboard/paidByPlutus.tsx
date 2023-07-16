import * as React from "react";
import DollarIcon from "@mui/icons-material/AttachMoney";
import CardWithIcon from "./cardWithIcon";

interface Props {
  lockedAmounts: number;
  unlockedAmounts: number;
}

const PaidByPlutus = (props: Props) => {
  const { lockedAmounts = 0, unlockedAmounts = 0 } = props;
  return (
    <CardWithIcon
      to="/plutustxs"
      icon={DollarIcon}
      title="Transaction amounts (M $Ada)"
      subtitle={`Locked: ${lockedAmounts}, Unlocked: ${unlockedAmounts}`}
    />
  );
};

export default PaidByPlutus;
