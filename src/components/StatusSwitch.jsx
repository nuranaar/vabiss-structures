import React, { useState } from "react";
import { Switch } from "devextreme-react/switch";

const StatusSwitch = ({ options, store, status }) => {
  const [state, setState] = useState(options.data.status);

  const onChange = () => {
    store.update(options.key, { status: !state });
    setState(!state);
    status && status(!state);
  };
  return (
    <Switch defaultValue={false} value={state} onValueChanged={onChange} />
  );
};

export default StatusSwitch;
