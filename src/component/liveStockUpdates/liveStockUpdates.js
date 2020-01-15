import React, { Component } from "react";
import StocksList from "../stockList/stockList";

const url = "ws://stocks.mnet.website/";

class LiveStockUpdates extends Component {
  state = {
    stocks: {},
    connectionError: false
  };

  componentDidMount = () => {
    this.wsConnection = new WebSocket(url);
    this.wsConnection.onmessage = this.saveLatestStockValues;
    this.wsConnection.onclose = () => {
      this.setState({ connectionError: true });
    };
  };

  saveLatestStockValues = event => {
    let stockData = JSON.parse(event.data);
    let [upValues, downValues] = [0, 0];

    // time stored in histories should be consisitent across stocks(better for graphs)
    let currentTime = Date.now();
    let newStocks = this.state.stocks;
    stockData.map(stock => {
      if (this.state.stocks[stock[0]]) {
        newStocks[stock[0]].currentValue > Number(stock[1])
          ? upValues++
          : downValues++;

        newStocks[stock[0]].currentValue = Number(stock[1]);
        newStocks[stock[0]].history.push({
          time: currentTime,
          value: Number(stock[1])
        });
      } else {
        newStocks[stock[0]] = {
          currentValue: stock[1],
          history: [{ time: Date.now(), value: Number(stock[1]) }],
          isSelected: false
        };
      }
    });
    this.setState({
      stocks: newStocks
    });
  };

  isLivestockLoaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  };

  render() {
    return (
      <div>
        <div>
          <StocksList
            stocks={this.state.stocks}
            isLivestockLoaded={this.isLivestockLoaded}
          />
        </div>
      </div>
    );
  }
}

export default LiveStockUpdates;
