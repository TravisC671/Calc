import { useEffect } from "react";

function KeyboardInput() {
  useEffect(() => {
    const handleKeyboardInput = (event: KeyboardEvent) => {
      let key = event.key;

      let keyID = getKeyID(key);

      if (keyID != undefined) {
        const customKeyPressEvent = new CustomEvent("CustomKeyPress", {
          detail: { key: keyID },
        });

        window.dispatchEvent(customKeyPressEvent);
      }
    };

    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);

  return <></>;
}

function isNumeric(num: any) {
  return !isNaN(num);
}

function getKeyID(key: string): string | undefined {
  if (isNumeric(key)) {
    return `num_${key}`;
  }

  switch (key) {
    case "ArrowLeft":
      return "arrow_left";
    case "ArrowRight":
      return "arrow_right";
    case "ArrowUp":
      return "arrow_up";
    case "ArrowDown":
      return "arrow_down";
    case "Backspace":
      return "func_backsp";
    // case "Enter": //TODO for some reason this causes the screen to break
    //   return "op_enter";
    case "/":
      return "op_div";
    case "*":
      return "op_mult";
    case "-":
      return "op_sub";
    case "+":
      return "op_add";
  }
}

export default KeyboardInput;
