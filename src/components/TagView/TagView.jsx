import React, { useState } from 'react';
import './TagView.css'; // Import the CSS file

const TagView = ({ tag, onUpdate, onAddChild }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newTagName, setNewTagName] = useState(tag.name);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleEditClick = () => setEditing(true);

  const handleEditChange = (event) => setNewTagName(event.target.value);

  const handleEditKeyPress = (event) => {
    if (event.key === 'Enter') {
      onUpdate(tag.name, newTagName);
      setEditing(false);
    }
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={toggleCollapsed}>{collapsed ? '>' : 'v'}</button>
        {editing ? (
          <input
            type="text"
            value={newTagName}
            onChange={handleEditChange}
            onKeyPress={handleEditKeyPress}
          />
        ) : (
          <span onClick={handleEditClick}>{tag.name}</span>
        )}
        {tag.data && (
          <input
            type="text"
            value={tag.data}
            onChange={(event) => onUpdate(tag.name, newTagName, event.target.value)}
          />
        )}
        <button onClick={() => onAddChild(tag.name)}>Add Child</button>
      </div>
      {!collapsed && tag.children && (
        <div className="tag-children">
          {tag.children.map((childTag) => (
            <TagView
              key={childTag.name}
              tag={childTag}
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
