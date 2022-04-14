import axios from "axios"; // Axios
import Link from "next/link"; // Routing
import Layout from "@components/Layout"; // Layout wrapper
import PledgeCard from "@components/PledgeCard"; // PledgeCard component
import styles from "@styles/pages/Home.module.css"; // Component styles
import { useRouter } from "next/dist/client/router"; // Router
import { ReactElement, useState, useEffect } from "react"; // React
import type { PrethnupInterface } from "@utils/types";

/**
 * Home page
 * @returns {ReactElement}
 */
export default function Home(): ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [pledges, setPledges] = useState<PrethnupInterface[]>([]);

  /**
   * Collect pledges from chain
   */
  async function collectpledges(): Promise<void> {
    setLoading(true); // Toggle loading

    // Update data
    const { data } = await axios.get("/api/pledge");
    console.log(data)
    setPledges([data]);

    setLoading(false); // Toggle loading
  }

  // --> Lifecycle: collect pledges on mount
  useEffect(() => {
    collectpledges();
  }, []);

  return (
    <Layout>
      <div>
        {/* Call to action header */}
        <div className={styles.home__cta}>
          <h1>Pledge your Prethnup</h1>
          <p>
            PRETHNUP
          </p>

          {/* CTA action buttons */}
          <div>
            {/* Direct to create page */}
            <Link href="/create">
              <a>Create pledge</a>
            </Link>
          </div>
        </div>

        {/* Feature section of open pledges */}
        <div className={styles.home__feature}>
          <div className="sizer">
            {/* Title */}
            <h2>All pledges</h2>
            <p>Retrieved {pledges.length} pledges.</p>

            {loading ? (
              // If loading, show loading state
              <div className={styles.home__feature_text}>
                <h3>Loading pledges...</h3>
                <p>Please wait as we collect the pledges from chain.</p>
              </div>
            ) : pledges.length == 0 ? (
              // If no pledges, show no pledges found
              <div className={styles.home__feature_text}>
                <h3>No pledges Found</h3>
                <p>Be the first to create a pledge!</p>
              </div>
            ) : (
              // If pledges are found, render clickable, active loaans
              <div className={styles.home__feature_pledges}>
                {pledges.map((pledge, i) => {
                  return (
                    <PledgeCard
                      key={i}
                      pledgeId={pledge.pledgeId}
                      onClickHandler={() => router.push(`/pledge/${pledge.pledgeId}`)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}