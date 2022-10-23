import React, { useContext } from "react";
import { ChapterContext } from "../contexts/ChapterContext";
import "./Container.css";
import data from "../data/Chapters.json";
import { Chapterr } from "./Chapter";
import { ChapterContainer } from "../containers";

export default function Containerr(props) {
  const contextType = useContext(ChapterContext);
  React.useEffect(() => {
    contextType.eraseTree([]);
  }, []);

  return (
    <div>
      <ChapterContainer>
        {data[0].map((chapter) => {
          console.log(chapter);
          return (
            <Chapterr
              viewOnly={false}
              key={chapter.chapterId}
              chapterData={chapter}
            />
          );
        })}
      </ChapterContainer>
    </div>
  );
}
