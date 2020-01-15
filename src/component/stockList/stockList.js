import React, { Component } from "react";
import StockItem from "../stockItem/stockItem";
import "./stockList.scss";
import "../liveStockUpdates/liveStockUpdates.scss";

class StockList extends Component {
  getStockList = stocks => {
    return Object.keys(stocks).map((stockName, index) => {
      let currentStock = stocks[stockName];
      return (
        <StockItem key={index} stockName={stockName} stockData={currentStock} />
      );
    });
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <h4>Live Stocks</h4>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>{this.getStockList(this.props.stocks)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StockList;
