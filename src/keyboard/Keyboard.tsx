import "./Keyboard.css";
import KeyboardInput from "./lib/KeyboardInput";
import Jkeys from "./lib/keys.json";

function Keyboard() {
  let cols = [0, 1, 2, 3, 4];
  return (
    <div className="keyboard-container">
      <KeyboardInput />
      <div className="macro-container">
        {cols.map((value, index) => (
          <MacroBtn colId={value} key={index} />
        ))}
      </div>
      <KeyButtons />
    </div>
  );
}

function MacroBtn({ colId }: { colId: number }) {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: "macro_" + colId, type: "macro" },
    });

    window.dispatchEvent(customKeyPressEvent);
  };
  return <button className="macro-btn" onClick={handleClick}></button>;
}

function KeyButtons() {
  let allKeyButtons: JSX.Element[] = [];

  Jkeys.keys.forEach((item, index) => {
    switch (item.type) {
      case "secondary":
        allKeyButtons.push(<SecondaryBtn key={index} />);
        break;
      case "alpha":
        allKeyButtons.push(<AlphaBtn key={index} />);
        break;
      case "function":
        allKeyButtons.push(
          <FunctionBtn
            text={item.text!}
            secondary={item.secondary!}
            alpha={item.alpha!}
            keyID={item.id!}
            hidden={false}
            key={index}
          />
        );
        break;
      case "arrow":
        allKeyButtons.push(<ArrowBtns key={index} />);
        break;
      case "operation":
        allKeyButtons.push(
          <OperationKeys
            text={item.text!}
            secondary={item.secondary!}
            alpha={item.alpha!}
            keyID={item.id!}
            key={index}
          />
        );
        break;
      case "numKeys":
        allKeyButtons.push(<NumKeyContainer key={index} />);
        break;
    }
  });

  return <div className="key-buttons">{allKeyButtons}</div>;
}

type FunctionBtnType = {
  text: string;
  secondary: string;
  alpha: string;
  keyID: string;
  hidden: boolean;
};
function FunctionBtn({
  text = "Default",
  secondary = "2nd",
  alpha = "A",
  keyID,
  hidden = true,
}: FunctionBtnType) {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: keyID },
    });

    window.dispatchEvent(customKeyPressEvent);
  };

  const el = !hidden ? (
    <button className="function-btn" onClick={handleClick}>
      <div className="function-text-container">
        <h3 className="function-text-sm alpha">{alpha}</h3>
        <h3 className="function-text-sm secondary">{secondary}</h3>
      </div>
      <h1 className="function-btn-text">{text}</h1>
    </button>
  ) : (
    <button className="function-btn" onClick={handleClick}></button>
  );

  return <>{el}</>;
}

function AlphaBtn() {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: "alpha" },
    });

    window.dispatchEvent(customKeyPressEvent);
  };

  return (
    <button className="alpha-btn" onClick={handleClick}>
      <h1 className="alpha-text">Alpha</h1>
    </button>
  );
}

function SecondaryBtn() {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: "second" },
    });

    window.dispatchEvent(customKeyPressEvent);
  };

  return (
    <button className="secondary-btn" onClick={handleClick}>
      <h1 className="secondary-text">2nd</h1>
    </button>
  );
}

type OperationKeysDef = {
  text: string;
  secondary: string;
  alpha: string;
  keyID: string;
};
function OperationKeys({ text, secondary, alpha, keyID }: OperationKeysDef) {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: keyID },
    });

    window.dispatchEvent(customKeyPressEvent);
  };
  return (
    <button className="function-btn operation-btn" onClick={handleClick}>
      <div className="function-text-container">
        <h3 className="function-text-sm alpha">{alpha}</h3>
        <h3 className="function-text-sm secondary">{secondary}</h3>
      </div>
      <h1 className="function-btn-text operation-btn-text">{text}</h1>
    </button>
  );
}

function NumKeyContainer() {
  let keys: JSX.Element[] = [];

  Jkeys.numKeys.forEach((item, index) => {
    keys.push(<NumKey text={item.text} key={index} keyID={item.id} />);
  });

  return <div className="numkey-btn-container">{keys}</div>;
}

type numKeyType = { text: string; keyID: string };
function NumKey({ text, keyID }: numKeyType) {
  const handleClick = () => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: keyID },
    });

    window.dispatchEvent(customKeyPressEvent);
  };

  return (
    <button className="numkey-btn" onClick={handleClick}>
      {text}
    </button>
  );
}

//this looks so ugly but I cant think of another way
//TODO need to revise this and make it accessible
function ArrowBtns() {
  const handleClick = (e: any) => {
    const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
      detail: { key: e.target.id },
    });

    window.dispatchEvent(customKeyPressEvent);
  };

  return (
    <div className="arrow-container">
      <svg className="arrow-svg" viewBox="0 0 106 106">
        <rect
          onClick={handleClick}
          id="arrow_sel"
          className="arrow-bg"
          x="35.69"
          y="35.69"
          width="34.62"
          height="34.62"
          rx="2.5"
          ry="2.5"
        />
        <g>
          <path
            onClick={handleClick}
            id="arrow_left"
            className="arrow-bg"
            d="M24.32,31.81L4.52,12.01c-1.67-1.67-4.52-.49-4.52,1.87v78.23c0,2.36,2.85,3.54,4.52,1.87l19.8-19.8c.5-.5.77-1.17.77-1.87v-38.64c0-.7-.28-1.37-.77-1.87Z"
          />
          <polygon
            className="arrow-symbol"
            points="7.88 53 17.21 60.29 17.21 45.71 7.88 53"
          />
        </g>
        <g>
          <path
            onClick={handleClick}
            id="arrow_right"
            className="arrow-bg"
            d="M80.91,33.68v38.64c0,.7.28,1.37.77,1.87l19.8,19.8c1.67,1.67,4.52.49,4.52-1.87V13.88c0-2.36-2.85-3.54-4.52-1.87l-19.8,19.8c-.5.5-.77,1.17-.77,1.87Z"
          />
          <polygon
            className="arrow-symbol"
            points="98.12 53 88.79 60.29 88.79 45.71 98.12 53"
          />
        </g>
        <g>
          <path
            onClick={handleClick}
            id="arrow_down"
            className="arrow-bg"
            d="M72.32,80.91h-38.64c-.7,0-1.37.28-1.87.77l-19.8,19.8c-1.67,1.67-.49,4.52,1.87,4.52h78.23c2.36,0,3.54-2.85,1.87-4.52l-19.8-19.8c-.5-.5-1.17-.77-1.87-.77Z"
          />
          <polygon
            className="arrow-symbol"
            points="53 98.12 45.71 88.79 60.29 88.79 53 98.12"
          />
        </g>
        <g>
          <path
            onClick={handleClick}
            id="arrow_up"
            className="arrow-bg"
            d="M74.19,24.32l19.8-19.8C95.65,2.85,94.47,0,92.12,0H13.88C11.53,0,10.35,2.85,12.01,4.52l19.8,19.8c.5.5,1.17.77,1.87.77h38.64c.7,0,1.37-.28,1.87-.77Z"
          />
          <polygon
            className="arrow-symbol"
            points="53 7.88 45.71 17.21 60.29 17.21 53 7.88"
          />
        </g>
      </svg>
    </div>
  );
}

export default Keyboard;
