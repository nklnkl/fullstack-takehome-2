import React from "react";
import SearchBar from "../../components/SearchBar";
import Headline from "../../components/Headline";
import MarketView from "../MarketView";
import {
  MainViewClassName,
  HeaderClassName,
  SearchBarClassName,
  AddressNotificationsClassName
} from "./style";

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
