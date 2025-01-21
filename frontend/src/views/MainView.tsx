import React from "react";
import SearchBar from "../components/SearchBar";
import Headline from "../components/Headline";
import MarketView from "./MarketView";

const MainViewClassName = "container mx-auto space-y-2 py-4";
const HeaderClassName = "flex flex-row";
const SearchBarClassName = "flex-1 p-4";
const AddressNotificationsClassName = "flex-none p-4";

const MainView: React.FC = () => {
  return <div className={MainViewClassName}>

    <div className={HeaderClassName}>
      <SearchBar className={SearchBarClassName}/>
      <div className={AddressNotificationsClassName}>Address Notifications</div>
    </div>

    <Headline
      price="$10,000"
      twentyFourHourChange="10%"
      oneHourFunding="10%"
      longOpenInterest="8.871 BTC"
      shortOpenInterest="8.871 BTC"
    />

    <MarketView/>
  </div>
};

export default MainView;
