import React, { useContext } from "react";
import { ChapterContext } from "../contexts/ChapterContext";
import { Chapterr } from "./Chapter";
import { ChapterContainer } from "../containers";
import "./Chapter.css";

export function NewPage() {
  const contextType = useContext(ChapterContext);
  let tree = [];
  tree = contextType.finalTree;

  return (
    <div>
      <ChapterContainer>
        {tree.map((chapter) => {
          return (
            <Chapterr
              viewOnly={true}
              key={chapter.chapterId}
              chapterData={chapter}
            />
          );
        })}
      </ChapterContainer>
    </div>
  );
}
