import { createPortal } from "preact/compat";
import Alert, { AlertType } from "./alert";
import { alerts } from "./states";

export function alert(param: Omit<AlertType, "onClose">) {
  const newItem = {
    ...param,
    onClose: () => {
      const index = alerts.value.findIndex((alert) => alert.id === param.id);
      alerts.value = [
        ...alerts.value.slice(0, index),
        ...alerts.value.slice(index + 1),
      ];
    },
  };

  alerts.value = [...alerts.value, newItem];
}

export default function AlertMgmt() {
  return createPortal(
    <div>
      {alerts.value.map((alert) => (
        <Alert key={alert.id} {...alert} />
      ))}
    </div>,
    document.getElementById("modals")!
  );
}
