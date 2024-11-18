import OverviewProvider from "./OverviewProvider";
import ItemDetailProvider from "../ListDetail/ItemDetailProvider";

function Overview() {
  return (
    <ItemDetailProvider>
      <OverviewProvider />
    </ItemDetailProvider>
  );
}

export default Overview;
