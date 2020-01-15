import React from "react";
import StockItem from "../stockItem/stockItem";
import "./stockList.scss";
import "../liveStockUpdates/liveStockUpdates.scss";

const StocksList = ({ stocks, isLivestockLoaded }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h4>Stocks</h4>
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
          <tbody>
            {Object.keys(stocks).map((stockName, index) => {
              let currentStock = stocks[stockName];
              return (
                <StockItem
                  key={index}
                  stockName={stockName}
                  stockData={currentStock}
                />
              );
            })}
            {isLivestockLoaded() ? null : (
              <tr>
                <td>No stocks loaded yet!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StocksList;
