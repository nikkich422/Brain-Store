import React, { useState } from 'react'

const NestedMenu = ({items, toggleDrawer}) => {
    
    const MenuItem = ({ item, toggleDrawer }) => {
      const [open, setOpen] = useState(false);
      const hasChildren = item.children && item.children.length > 0;
    
      return (
        <li>
            {hasChildren ? (
            <div
                onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
                }}
                style={{ cursor: "pointer", fontWeight: "bold" }}
            >
                {open ? "▼ " : "▶ "}
                {item.title}
            </div>
            ) : (
            <div onClick={toggleDrawer(false)}>
                {item.title}
            </div>
            )}
          {hasChildren && open && <NestedMenu items={item.children} toggleDrawer={toggleDrawer} />}
        </li>
      );
    };

  return (
    <ul style={{listStyle: "none", paddingLeft: "20px"}}>
        {items.map((item) => (
            <MenuItem key={item.id} item={item} toggleDrawer={toggleDrawer} />
        ))}
    </ul>
  );
}

export default NestedMenu
