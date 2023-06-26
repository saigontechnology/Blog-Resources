import React, { useState } from "react";

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <ul>
        {React.Children.map(children, (child, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? "active" : ""}
          >
            {child.props.label}
          </li>
        ))}
      </ul>
      {React.Children.toArray(children)[activeTab]}
    </>
  );
};

const Tab = ({ children }: any) => {
  return <>{children}</>;
};

Tab.defaultProps = {
  label: "",
};

const CompoundComponent = () => {
  return (
    <Tabs>
      <Tab label="Tab 1">
        <p>This is the content of tab 1.</p>
      </Tab>
      <Tab label="Tab 2">
        <p>This is the content of tab 2.</p>
      </Tab>
      <Tab label="Tab 3">
        <p>This is the content of tab 3.</p>
      </Tab>
    </Tabs>
  );
};

export default CompoundComponent;
