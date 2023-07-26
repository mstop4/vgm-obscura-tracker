'use client';

import styles from '@styles/ChannelOverview.module.scss';

// @ts-ignore
export default function ChannelOverview(props) {
  console.log(props.channelData);

  return (
    <main className={styles.main}>
      <h1>Welcome!</h1>
    </main>
  );
}
