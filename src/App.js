import React, { useState } from 'react';
import './App.css'; // You can create your own CSS file for styling.
import TagView from './components/TagView/TagView';
// import TagView from './components/TagView';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

function App() {
  const [tree, setTree] = useState(initialTree);

  const updateTag = (tagToUpdate, newData) => {
    const updatedTree = recursivelyUpdateTag(tree, tagToUpdate, newData);
    setTree(updatedTree);
  };

  const recursivelyUpdateTag = (currentTag, tagToUpdate, newData) => {
    if (currentTag === tagToUpdate) {
      return { ...currentTag, ...newData };
    }

    if (currentTag.children) {
      return {
        ...currentTag,
        children: currentTag.children.map((child) =>
          recursivelyUpdateTag(child, tagToUpdate, newData)
        ),
      };
    }

    return currentTag;
  };

  const addChildToTag = (parentTag) => {
    const newChild = { name: 'New Child', data: 'Data' };
    const updatedTree = recursivelyAddChild(tree, parentTag, newChild);
    setTree(updatedTree);
  };

  const recursivelyAddChild = (currentTag, parentTag, newChild) => {
    if (currentTag === parentTag) {
      if (!currentTag.children) {
        currentTag.children = [];
      }
      currentTag.children.push(newChild);
      return { ...currentTag };
    }

    if (currentTag.children) {
      return {
        ...currentTag,
        children: currentTag.children.map((child) =>
          recursivelyAddChild(child, parentTag, newChild)
        ),
      };
    }

    return currentTag;
  };

  const handleExport = () => {
    const exportedTree = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    console.log(exportedTree);
  };

  return (
    <div className="App">
      
      <TagView tag={tree} onUpdate={updateTag} onAddChild={addChildToTag} />
      <button onClick={handleExport}>Export</button>
    </div>
  );
}

export default App;
