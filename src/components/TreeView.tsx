import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import EditModal from './EditModal';

type TreeViewProps = {
  hasSVG: boolean;
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

const TreeView: React.FC<TreeViewProps> = ({ hasSVG }: TreeViewProps) => {

  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [open, setOpen] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!hasSVG) return;

    const svgElement = d3.select("svg").node() as Element | null;
    if (!svgElement) return;

    const svgTree = getTreeFromElement(svgElement);
    setTreeData(svgTree)

  }, [hasSVG]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRightClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault(); // Prevent the default context menu from opening
    setOpen(true)
    setSelectedElement(document.getElementById(id))
  };

  const renderTreeNode = (node: TreeNode): JSX.Element => {
    const isExpanded = expandedNodes[node.id];
    const hasChildren = node.children.length > 0;

    return (
      <li key={node.id} className={`text-xs ${hasChildren ? "custom-list-disc ml-4 mt-2" : "cirlce-list-disc ml-2 mt-1"}`}>
        <span
          className={`${hasChildren ? 'cursor-pointer hover:text-blue-600 ' : 'cursor-auto'}`}
          onClick={() => hasChildren && toggleNode(node.id)}
          onContextMenu={(event) => handleRightClick(event, node.id)}
        >
          {hasChildren && <i className='directory-icon'></i>}
          {node.id || 'N/A'}
        </span>
        {isExpanded && node.children.length > 0 && (
          <ul className="ml-4">
            {node.children.map(child => renderTreeNode(child))}
          </ul>
        )}
      </li>
    );
  };


  return (
    <div>
      <EditModal
        setOpen={setOpen}
        open={open}
        selectedElement={selectedElement}
      />
      {treeData ?
        <ul className="list-none">{renderTreeNode(treeData)}</ul> :
        <p>Add SVG to load tree data file...</p>}
    </div>
  );
};

export default TreeView;