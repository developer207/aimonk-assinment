import React, { useState } from 'react';
import './App.css'; 
import TagView from './components/TagView/TagView';
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
  const [exportData, setExportData]=useState("");

  const updateTagData = (tagToUpdate, newData) => {
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

  const handleExportData = () => {
    const exportedTree = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    setExportData(exportedTree)
    console.log(exportedTree);
  };

  return (
    <div className="px-20 space-y-5 py-10">

      <h1 className='py-5 text-2xl font-semibold text-center'>Tree</h1>
      
      <TagView tag={tree} onUpdate={updateTagData} onAddChild={addChildToTag} />
      <button className='py-3 font-bold text-xl bg-gray-300 w-full rounded-md' onClick={handleExportData}>Export Data</button>

      {exportData && <p>{exportData}</p>}
    </div>
  );
}

export default App;
