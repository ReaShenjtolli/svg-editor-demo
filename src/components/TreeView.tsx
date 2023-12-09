import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

type TreeViewProps = {
  data: any;
};

interface TreeNode {
  tagName: string;
  id: string;
  children: TreeNode[];
}

function getTreeFromElement(element: Element): TreeNode {
  let tree: TreeNode = {
    tagName: element.tagName,
    id: element.id,
    children: []
  };

  Array.from(element.children).forEach(child => {
    tree.children.push(getTreeFromElement(child));
  });

  return tree;
}

const TreeView: React.FC<TreeViewProps> = ({ data }: TreeViewProps) => {

  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  useEffect(() => {
    if (!data) return;

    const svgElement = d3.select("svg").node() as Element | null;
    if (!svgElement) return;

    const svgTree = getTreeFromElement(svgElement);
    setTreeData(svgTree)

  }, [data]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderTreeNode = (node: TreeNode): JSX.Element => {
    const isExpanded = expandedNodes[node.id];

    return (
      <li>
        <span style={node.tagName === "g" ? { color: "red" } : { color: 'black' }} onClick={() => toggleNode(node.id)}>
          {node.id || 'N/A'}
        </span>
        {isExpanded && node.children.length > 0 && (
          <ul style={{paddingLeft: "20px"}}>
            {node.children.map(child => renderTreeNode(child))}
          </ul>
        )}
      </li>
    );
  };


  return (
    <div id='treeContainer'>
      {treeData ? <ul>
        {renderTreeNode(treeData)}
      </ul> :
        <p>Loading tree data...</p>}
    </div>
  );

};

export default TreeView;