import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const styles = {
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "20px",
  },

  menuItem: {
    position: "relative",
  },

  label: {
    cursor: "pointer",
    padding: "8px 12px",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },

  // 🔽 first level submenu (opens DOWN)
  subMenuRoot: {
    position: "absolute",
    top: "100%",
    left: 0,
    listStyle: "none",
    padding: "6px 0",
    margin: 0,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    minWidth: "180px",
    zIndex: 1000,
  },

  // ▶ nested submenu (opens RIGHT)
  subMenuNested: {
    position: "absolute",
    top: 0,
    left: "100%",
    listStyle: "none",
    padding: "6px 0",
    margin: 0,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    minWidth: "180px",
    zIndex: 1000,
  },

  arrow: {
    fontSize: "12px",
  },
};

const HoverMenu = ({ items, level = 0, onItemClick }) => {
  return (
    <ul style={level === 0 ? styles.menu : { listStyle: "none", padding: 0 }}>
      {items.map((item) => (
        <HoverItem
          key={item.id}
          item={item}
          level={level}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

const HoverItem = ({ item, level, onItemClick }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <li
      style={styles.menuItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        style={styles.label}
        onClick={() => !hasChildren && onItemClick?.(item)}
      >
        {item.title}
        {hasChildren && <span style={styles.arrow}><IoIosArrowDown /></span>}
      </div>

      {hasChildren && open && (
        <ul style={level === 0 ? styles.subMenuRoot : styles.subMenuNested}>
          <HoverMenu
            items={item.children}
            level={level + 1}
            onItemClick={onItemClick}
          />
        </ul>
      )}
    </li>
  );
};

export default HoverMenu;
