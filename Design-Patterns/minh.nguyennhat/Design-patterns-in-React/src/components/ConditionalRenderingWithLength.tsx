import React from "react";

const ConditionalRenderingWithLength = ({ items }: any) => {
  return (
    <div>
      {items.length > 0 && (
        <ul>
          {items.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      {items.length === 0 && <p>No items found.</p>}
    </div>
  );
};

export default ConditionalRenderingWithLength;
