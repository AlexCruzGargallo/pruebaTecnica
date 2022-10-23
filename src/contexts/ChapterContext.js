import React, { createContext, Component, useState } from "react";

export const ChapterContext = createContext();

const ChapterContextProvider = ({ children }) => {
  const [finalTree, setFinalTree] = useState([]);
  const [found, setFound] = useState(false);

  const eraseTree = () => {
    setFinalTree([]);
  };
  const changeFinalTree = (value) => {
    if (value) {
      if (finalTree.length === 0 || value.chapterInfo.parentId === "root") {
        finalTree.push(value);
        console.log("AÑADO");
      } else {
        setFound(false);
        finalTree.map((chapter) => {
          findParent(value, chapter);
        });
        if (!found) {
          finalTree.push(value);
        }
      }
    }
  };

  const findParent = (value, tree) => {
    if (tree.chapterId === value.chapterInfo.parentId) {
      setFound(true);
      tree.subchapters.push(value);
    } else {
      if (tree.subchapters) {
        tree.subchapters.map((chapter) => {
          findParent(value, chapter);
        });
      }
    }
  };

  const deleteNode = (value) => {
    const index = finalTree.findIndex(({ chapterId }) => chapterId === value);
    if (index > -1) {
      finalTree.splice(index, 1);
      return;
    } else {
      finalTree.map((chapter) => {
        if (chapter.subchapters.length > 0) {
          if (deleteNodeRec(value, chapter.subchapters)) {
            return;
          }
        }
      });
    }
  };

  const deleteNodeRec = (value, tree) => {
    const index = tree.findIndex(({ chapterId }) => chapterId === value);
    if (index > -1) {
      tree.splice(index, 1);
      return true;
    } else {
      tree.map((chapter) => {
        if (chapter.subchapters) {
          deleteNodeRec(value, chapter.subchapters);
        }
      });
    }
  };

  return (
    <ChapterContext.Provider
      value={{ eraseTree, finalTree, changeFinalTree, deleteNode }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export default ChapterContextProvider;
