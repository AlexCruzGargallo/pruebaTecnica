import React, { useContext } from "react";
import { ChapterContext } from "../contexts/ChapterContext";
import { useState } from "react";
import "./Chapter.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { SubChapterContainer, ShowChildDiv } from "../containers";

export function Chapterr(props, setParent) {
  const [check, setCheck] = useState(false);
  const [chapters, setChapters] = useState(false);
  const contextType = useContext(ChapterContext);

  function createChilds() {
    if (props.chapterData.subchapters) {
      return props.chapterData.subchapters.map((subchapter) => {
        if (!props.viewOnly) {
          return (
            <Chapterr
              viewOnly={false}
              key={subchapter.chapterId}
              checkChilds={check}
              chapterData={subchapter}
              highlight={chapters}
            />
          );
        } else {
          return (
            <Chapterr
              viewOnly={true}
              key={subchapter.chapterId}
              checkChilds={check}
              chapterData={subchapter}
              highlight={chapters}
            />
          );
        }
      });
    }
  }

  React.useEffect(() => {
    setCheck(props.checkChilds);
  }, [props.checkChilds]);

  function checkChapter() {
    setCheck(!check);
    if (!check) {
      contextType.changeFinalTree(props.chapterData);
    } else {
      contextType.deleteNode(props.chapterData.chapterId);
    }
  }

  return (
    <>
      <SubChapterContainer
        style={{ background: chapters || props.highlight ? "#f8d47c" : "" }}
      >
        <i className="iconCheck" onClick={() => setChapters(!chapters)}>
          {chapters ? <FaChevronDown /> : <FaChevronRight></FaChevronRight>}
        </i>
        {!props.viewOnly ? (
          <input
            className="checkBox"
            type="checkbox"
            checked={check || ""}
            onChange={() => {
              checkChapter();
            }}
          />
        ) : null}

        {props.chapterData.chapterInfo.name}
      </SubChapterContainer>
      <ShowChildDiv
        style={{
          display: chapters ? "block" : "none",
          background:
            props.chapterData.chapterInfo.parentId === "root"
              ? "#ffeccc"
              : "white",
        }}
      >
        {createChilds()}
      </ShowChildDiv>
    </>
  );
}
