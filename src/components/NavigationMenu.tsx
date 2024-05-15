"use client";

import Link from "next/link";

import classNames from "classnames";
import styles from "./NavigationMenu.module.css";

const NavigationMenu = () => {
  const urls: { text: string; url: string }[] = [
    { text: "main", url: "/" },
    { text: "Countries", url: "/admin/countries" },
  ];

  return (
    <div className={classNames(styles.link, "flex flex-column gap-1")}>
      {urls.map((i) => (
        <Link href={i.url} key={i.url} className={styles.link}>
          {i.text}
        </Link>
      ))}
    </div>
  );
};

export default NavigationMenu;
