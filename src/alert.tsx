import classnames from "classnames";
import { createPortal } from "preact/compat";
import { useEffect } from "preact/hooks";

type TypeOfAlert = "info" | "success" | "warning" | "error";

interface Props {
  id: string;
  type: TypeOfAlert;
  title?: string;
  description: string;
  buttons?: Array<{
    text: string;
    onClick: (e: MouseEvent) => void;
  }>;
  onClose: () => void;
  delayDismiss?: number;
}

export { type Props as AlertType };

const DELAY = 2000;

function Alert({
  id,
  type,
  title,
  description,
  buttons,
  onClose,
  delayDismiss = DELAY,
}: Props) {
  useEffect(() => {
    if (!(buttons && buttons.length)) {
      setTimeout(() => {
        onClose();
      }, delayDismiss);
    }
  }, []);
  return createPortal(
    <div class={`alert alert-${type} fixed right-4 top-2 w-96`} id={id}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {title ? (
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{description}</div>
        </div>
      ) : (
        <span>{description}</span>
      )}
      {buttons && buttons?.length ? (
        <div>
          {buttons?.map((btn, index) => {
            return (
              <button
                onClick={(e) => {
                  btn.onClick(e);
                  onClose();
                }}
                class={classnames("btn", "btn-sm", {
                  ["btn-primary"]: index > 0,
                })}
              >
                {btn.text}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>,
    document.getElementById("modals")!
  );
}

export default Alert;
