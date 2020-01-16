import React, { Component } from "react";
import moment from "moment";
// styles
import "./stockList.scss";
import "../liveStockUpdates/liveStockUpdates.scss";

class StockList extends Component {
  getStockValue = stock => {
    if (stock.currentValue < stock.history.slice(-2)[0].value) {
      return "price-decreased";
    } else if (stock.currentValue > stock.history.slice(-2)[0].value) {
      return "price-increased";
    } else {
      return null;
    }
  };

  getStockList = stocks => {
    return Object.keys(stocks).map((stockName, index) => {
      let currentStock = stocks[stockName];
      return (
        <tr id={stockName}>
          <td>{stockName}</td>
          <td className={this.getStockValue(currentStock)}>
            {currentStock.currentValue.toFixed(3)}
          </td>
          <td>
            {moment(currentStock.history.slice(-1)[0].time)
              .startOf()
              .fromNow()}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <h4>Live Stocks</h4>
        </div>
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
    );
  }
}

export default StockList;
