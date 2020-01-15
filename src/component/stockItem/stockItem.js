import React, { Component } from "react";
import moment from "moment";
import "./stockItem.scss";

class StockItem extends Component {
  getStockValueColor = stock => {
    if (stock.currentValue < stock.history.slice(-2)[0].value) {
      return "red";
    } else if (stock.currentValue > stock.history.slice(-2)[0].value) {
      return "green";
    } else {
      return null;
    }
  };

  render() {
    const { stockName, stockData } = this.props;
    return (
      <tr id={stockName}>
        <td>{stockName.toUpperCase()}</td>
        <td className={this.getStockValueColor(stockData)}>
          {stockData.currentValue.toFixed(2)}
        </td>
        <td>
          {moment(stockData.history.slice(-1)[0].time)
            .startOf()
            .fromNow()}
        </td>
      </tr>
    );
  }
}

export default StockItem;
