import { eth } from "@state/eth"; // Eth state provider
import { prethnup } from "@state/prethnup"; // prethnup functions state provider
import type { ReactElement } from "react"; // Types

/**
 * State providing wrapper
 * @param {ReactElement[]} children to inject
 * @returns {ReactElement} wrapper
 */
export default function StateProvider({
  children,
}: {
  children: ReactElement[];
}): ReactElement {
  return (
    // Wrap in eth and prethnup sub-providers
    <eth.Provider>
      <prethnup.Provider>{children}</prethnup.Provider>
    </eth.Provider>
  );
}