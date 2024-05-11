import styles from "./page.module.css";

import { Button } from "primereact/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>main page</h1>
      <Button label="Check" icon="pi pi-check" />
      <div className="flex flex-column">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </main>
  );
}
