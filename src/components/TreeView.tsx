import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

type TreeViewProps = {
  data: any;
};

const TreeView: React.FC<TreeViewProps> = ({ data }: TreeViewProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data) return;

    const svgTree = d3.hierarchy<TreeNode>(data);
  
    const nodesObject: Record<string, any> = {}; // Define an object to store nodes

    svgTree.each((node: any) => {
      const depth = node.depth; // Get the depth of the current node
      const nodeName = `depth_${depth}_nodes`; // Create a key for the node based on depth
    
      if (!nodesObject[nodeName]) {
        nodesObject[nodeName] = []; // Initialize an array if it doesn't exist for this depth
      }
    
      nodesObject[nodeName].push(node.data); // Push node data into the respective depth array
    });    

  }, [data]);

  return <div id='treeContainer'>test</div>
  // return <svg ref={svgRef} />;
};

export default TreeView;