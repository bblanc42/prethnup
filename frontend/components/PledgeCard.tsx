import type { ReactElement } from "react"; // Types

export default function PledgeCard({
  pledgeId,
  onClickHandler,
  ...props
}: {
  pledgeId: number;
  onClickHandler: Function;
}): ReactElement {
  return (
    <button
      // // Highlight if active
      // className={selected ? `${styles.card} ${styles.active}` : styles.card}
      // Pass handler
      onClick={() => onClickHandler()}
      // Pass additional params (key)
      {...props}
    >

      <div>
        <h2>pledgeId</h2>
      </div>
    </button>
  );
}