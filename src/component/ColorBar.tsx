import { css } from "@emotion/react";
import { colorSet } from "@/Constants";
import type { Dispatch, SetStateAction } from "react";

const listStyle = (isSelected: boolean, colorKey: string) =>
  css({
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: isSelected ? "1px solid black" : "none",
    backgroundColor: colorSet[colorKey],
    "& > span": {
      clipPath: "polygon(0 0, 0 0, 0 0)",
    },
  });

function ColorBar({
  color,
  setColor,
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <section
        css={css({
          position: "fixed",
          bottom: "10px",
          left: "10px",
        })}
      >
        <ul>
          {Object.entries(colorSet).map((keyValue) => {
            const [id, value] = keyValue;
            return (
              <li
                key={id}
                css={listStyle(id == color, id)}
                onClick={() => {
                  setColor(id);
                }}
              >
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default ColorBar;
