import React, { useState } from "react";

const DragDropComponent = () => {
  const items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
  ];

  const [dropZones, setDropZones] = useState([
    { id: 1, items: [items[0], items[3]] },
    { id: 2, items: [items[2]] },
    { id: 3, items: [items[1], items[4]] },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    const droppedItemId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const droppedItem = items.find((item) => item.id === droppedItemId);
    if (droppedItem) {
      const updatedDropZones = dropZones.map((zone) => {
        if (zone.id === zoneId) {
          console.log("zone", zone);
          return {
            ...zone,
            items: [...new Set([...zone.items, droppedItem])],
          };
        } else {
          return {
            ...zone,
            items: zone.items.filter((item) => item.id !== droppedItemId),
          };
        }
      });
      setDropZones([...new Set(updatedDropZones)]);
    }
  };

  return (
    <div className="flex">
      {dropZones.map((zone) => (
        <div
          key={zone.id}
          className="border border-gray-300 p-4 m-2 flex-1"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, zone.id)}
        >
          <div>Drop Zone {zone.id}</div>
          {zone.items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 p-4 m-2 cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragDropComponent;
