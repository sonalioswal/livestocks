import React, { useEffect, useState } from "react";
// styles
import "./liveStockUpdates.scss";

const ws = new WebSocket("ws://stocks.mnet.website");

const LiveStockUpdates = () => {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      setDataFromServer(message);
      console.log(message);
    };
  }, []);

  const renderList = list => {
    return list.map(([name, price]) => (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{renderList(dataFromServer)}</tbody>
    </table>
  );
};

export default LiveStockUpdates;
