"use client";

import Link from "next/link";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Tree, TreeTogglerTemplateOptions } from "primereact/tree";
import { TreeNode } from "primereact/treenode";
import styles from "./NavigationMenu.module.css";

const NavigationMenu = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const nodes = [
    {
      key: "0",
      label: "Администрирование",
      children: [
        {
          key: "0-0",
          label: "Страны",
          url: "/admin/countries",
          children: [
            {
              key: "0-0",
              label: "Страны",
            },
          ],
        },
        {
          key: "0-1",
          label: "Города",
          url: "/admin/cities",
        },
        {
          key: "0-2",
          label: "Запреты",
          url: "/admin/restrictions",
        },
      ],
    },
  ];

  const nodeTemplate = (node: any, options: any) => {
    let label = <b>{node.label}</b>;

    if (node.url) {
      label = (
        <>
          <Link
            href={node.url}
            className={classNames(styles.link, {
              [styles.active]: isActive(node.url),
            })}
          >
            {node.label}
          </Link>
        </>
      );
    }

    return <span className={options.className}>{label}</span>;
  };

  const togglerTemplate = (
    node: TreeNode,
    options: TreeTogglerTemplateOptions
  ) => {
    if (!node) {
      return;
    }

    const expanded = options.expanded;
    const iconClassName = classNames("p-tree-toggler-icon pi pi-fw", {
      "pi-caret-right": !expanded,
      "pi-caret-down": expanded,
    });

    return (
      <button
        type="button"
        className="p-tree-toggler p-link"
        tabIndex={-1}
        onClick={options.onClick}
      >
        <span className={iconClassName} aria-hidden="true"></span>
      </button>
    );
  };

  return (
    <div className={classNames(styles.link, "flex flex-column gap-1")}>
      <Tree
        value={nodes}
        nodeTemplate={nodeTemplate}
        togglerTemplate={togglerTemplate}
        className=""
      />
    </div>
  );
};

export default NavigationMenu;
