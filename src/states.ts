import { signal } from "@preact/signals";
import { AlertType } from "./alert";

const alerts = signal<Array<AlertType>>([]);

export { alerts };
