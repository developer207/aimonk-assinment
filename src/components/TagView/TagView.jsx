import { useState } from "react";
import "./TagView.css"

const TagView = ({ tag, onUpdate, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(tag.name);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleAddChild = () => {
    onAddChild(tag);
  };

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameSave = (event) => {
    if (event.key === 'Enter') {
      setEditingName(false);
      onUpdate(tag, { name });
    }
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button className="" onClick={handleCollapse}>{collapsed ? '>' : 'v'}</button>
        {editingName ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleNameSave}
            onBlur={handleNameSave}
          />
        ) : (
          <span onClick={handleNameEdit}>{tag.name}</span>
        )}
        <button onClick={handleAddChild}>Add Child</button>
      </div>
      {!collapsed && (
        <div className="tag-content">
          {tag.data !== undefined && (
            <input
              type="text"
              value={tag.data}
              onChange={(event) => onUpdate(tag, { data: event.target.value })}
            />
          )}
          {tag.children &&
            tag.children.map((child) => (
              <TagView
                key={child.name}
                tag={child}
                onUpdate={onUpdate}
                onAddChild={onAddChild}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TagView;
