import React, { useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import EditModal from './modals/EditModal';

type TreeViewProps = {
  fileContent: string;
};

interface TreeNode {
  tagName: string;
  id: string;
  children: TreeNode[];
}

const getTreeFromElement = (element: Element): TreeNode => ({
  tagName: element.tagName,
  id: element.id,
  children: Array.from(element.children).map(child => getTreeFromElement(child as Element)),
});

const TreeView: React.FC<TreeViewProps> = ({ fileContent }) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!fileContent) return;

    const svgElement = d3.select("svg").node() as Element | null;
    if (svgElement) {
      setTreeData(getTreeFromElement(svgElement));
    }
  }, [fileContent]);

  useEffect(() => {
    const container = d3.select('.tree-view-container');
    container.select('ul').remove();

    if (treeData) {
      const ul = container.append('ul').attr('class', 'list-none');
      renderTreeNode(treeData, ul.node());
    }
  }, [treeData, expandedNodes]);

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleRightClick = useCallback((event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setOpen(true);
    setSelectedElement(document.getElementById(id));
  }, []);

  const renderTreeNode = (node: TreeNode, parentElement: HTMLElement | null) => {
    const isExpanded = expandedNodes[node.id];

    const li = d3.select(parentElement).append('li')
      .attr('class', node.children.length ? 'custom-list-disc' : 'circle-list-disc');

    const span = li.append('span')
      .attr('class', node.children.length ? 'cursor-pointer' : 'cursor-auto')
      .on('click', () => node.children.length && toggleNode(node.id))
      .on('contextmenu', (event) => handleRightClick(event, node.id));

    if (node.children.length) {
      span.append('i').attr('class', 'directory-icon');
    }

    span.text(node.id || 'N/A');

    if (isExpanded && node.children.length) {
      const ul = li.append('ul').style('margin-left', '2em');
      node.children.forEach(child => renderTreeNode(child, ul.node()));
    }
  };

  return (
    <div>
      <EditModal
        setOpen={setOpen}
        open={open}
        selectedElement={selectedElement}
      />
      <div className="tree-view-container">
        {treeData ? null : <p>Add SVG to load tree data file...</p>}
      </div>
    </div>
  );
};

export default TreeView;
