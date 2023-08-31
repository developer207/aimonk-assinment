import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TagView from './components/TagView/TagView';

function App() {
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

  const [tree, setTree] = useState(initialTree);

  const handleUpdate = (parentName, childName, newData) => {
    const updatedTree = updateTreeData(tree, parentName, childName, newData);
    setTree(updatedTree);
  };
  
  const handleAddChild = (parentName) => {
    const updatedTree = addChildToTree(tree, parentName);
    setTree(updatedTree);
  };
  
  // Function to update the data of a specific child in the tree
  const updateTreeData = (currentNode, parentName, childName, newData) => {
    if (currentNode.name === parentName) {
      const updatedChildren = currentNode.children.map((child) => {
        if (child.name === childName) {
          return { ...child, data: newData };
        }
        return child;
      });
      return { ...currentNode, children: updatedChildren };
    }
  
    if (currentNode.children) {
      const updatedChildren = currentNode.children.map((child) =>
        updateTreeData(child, parentName, childName, newData)
      );
      return { ...currentNode, children: updatedChildren };
    }
  
    return currentNode;
  };
  
  // Function to add a new child to the tree
  const addChildToTree = (currentNode, parentName) => {
    if (currentNode.name === parentName) {
      const newChild = { name: 'New Child', data: 'Data' };
      if (!currentNode.children) {
        currentNode.children = [];
      }
      const updatedChildren = [...currentNode.children, newChild];
      return { ...currentNode, children: updatedChildren };
    }
  
    if (currentNode.children) {
      const updatedChildren = currentNode.children.map((child) =>
        addChildToTree(child, parentName)
      );
      return { ...currentNode, children: updatedChildren };
    }
  
    return currentNode;
  };
  


  return (
    <div className="App">
      <TagView tag={tree} onUpdate={handleUpdate} onAddChild={handleAddChild} />

    </div>
  );
}

export default App;
