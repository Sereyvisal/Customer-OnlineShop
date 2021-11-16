import { MdExpandLess } from "react-icons/md";
import React, { useState } from "react";

const Tree = ({ data = [], setFilters }) => {
  return (
    <div>
      <ul className="flex list-none flex-col">
        {data.map((tree) => (
          <TreeNode key={tree._id} node={tree} setFilters={setFilters} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node, setFilters }) => {
  const [childVisible, setChildVisiblity] = useState(true);

  const hasChild = node.items.length > 0 ? true : false;

  const handleSelectedCategory = (value) => {
    setFilters(value);
  }

  return (
    <li className="pt-4 pl-5 border-0 text-base font-normal">
      {hasChild && (
        <div className="flex items-center justify-between cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
          <span onClick={() => handleSelectedCategory(node._id)} className="w-60">{node.name}</span>
          <MdExpandLess className={childVisible ? 'transform rotate-180' : ''}  onClick={(e) => setChildVisiblity((v) => !v)} />
        </div>
      )}

      {!hasChild && (
        <div className="flex items-center justify-between cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
          <span onClick={() => handleSelectedCategory(node._id)} className="w-full">{node.name}</span>
        </div>
      )}

      {hasChild && childVisible && (
        <div>
          <ul className="flex list-none p-0 flex-col">
            <Tree data={node.items} setFilters={setFilters} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;