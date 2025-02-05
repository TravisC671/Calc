import { useEffect, useRef, useState } from "react";
import "./ViewScreen.css";
import { evaluate } from "mathjs";
import { sciKeys, calcState } from "./lib/keys";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

function ViewScreen() {
  const [expression, setExpression] = useState<calcState>({
    input: "",
    cursorPos: 0,
    alpha: false,
    second: false,
  });

  const pastExprRef = useRef<JSX.Element[]>([]);

  //TODO currently using js eval, but I want to create my own system
  useEffect(() => {
    const handleButtonClick = (event: any) => {
      setExpression((prevExpr) => {
        if (event.detail.key == "op_enter") {
          let res;
          try {
            res = evaluate(prevExpr.input);
          } catch {
            res = "error";
          }

          pastExprRef.current.push(
            <PastExpression
              expr={prevExpr.input}
              res={res}
              key={pastExprRef.current.length}
            />
          );

          return {
            ...prevExpr,
            input: "",
            cursorPos: 0,
          };
        } else {
          let result;

          try {
            result = sciKeys[event.detail.key].onPress(prevExpr);
          } catch {
            console.error(`${event.detail.key} not defined`);
            result = prevExpr;
          }

          return result;
        }
      });
    };

    window.addEventListener("CustomKeyPress", handleButtonClick);

    return () => {
      window.removeEventListener("CustomKeyPress", handleButtonClick);
    };
  }, []);

  return (
    <div className="screen-container">
      <div className="macro-disp-container">
        <MacroDisp type="left" text="graph" />
        <MacroDisp type="middle" text="f<->d" />
        <MacroDisp type="middle" text="" />
        <MacroDisp type="middle" text="" />
        <MacroDisp type="right" text="" />
      </div>
      <div className="input-container">
        {/* <h1 className="screen-input">
          {expression.input.substring(0, expression.cursorPos)}
        </h1> */}
        <h1 className="math-text-input">
          <StaticMathField>{expression.input}</StaticMathField>
        </h1>
        {/* <div className="screen-cursor"></div>
        <h1 className="screen-input">
          {expression.input.substring(
            expression.cursorPos,
            expression.input.length
          )}
        </h1> */}
      </div>
      <div className="past-contianer">{pastExprRef.current}</div>
    </div>
  );
}

function PastExpression({ expr, res }: { expr: string; res: string }) {
  return (
    <div className="past-expr-container">
      <h3 className="past-expr-text">{expr}</h3>
      <h3 className="past-expr-res">{res}</h3>
    </div>
  );
}

const macroType = ["left", "middle", "right"] as const;

type MacroType = (typeof macroType)[number];

function MacroDisp({ type, text }: { type: MacroType; text: string }) {
  return <div className={`macro-disp macro-${type}`}>{text}</div>;
}

export default ViewScreen;
