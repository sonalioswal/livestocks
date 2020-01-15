import React, { Component } from "react";
import StocksList from "../stockList/stockList";

const url = "wss://stocks.mnet.website/";

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
    let currentTime = Date.now();
    let newStocks = this.state.stocks;
    stockData.forEach(stock => {
      let stockObj = Object.assign({}, stock, {
        stockName: stock[0],
        stockValue: stock[1]
      });
      if (this.state.stocks[stockObj.stockName]) {
        newStocks[stockObj.stockName].currentValue > Number(stockObj.stockValue)
          ? upValues++
          : downValues++;

        newStocks[stockObj.stockName].currentValue = Number(
          stockObj.stockValue
        );
        newStocks[stockObj.stockName].history.push({
          time: currentTime,
          value: Number(stockObj.stockValue)
        });
      } else {
        newStocks[stockObj.stockName] = {
          currentValue: stockObj.stockValue,
          history: [
            {
              time: Date.now(),
              name: stockObj.stockName,
              value: Number(stockObj.stockValue)
            }
          ]
        };
      }
    });
    this.setState({
      stocks: newStocks
    });
  };

  render() {
    return (
      <div>
        <div>
          <StocksList stocks={this.state.stocks} />
        </div>
      </div>
    );
  }
}

export default LiveStockUpdates;
