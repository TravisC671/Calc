//state includes the current input string, if the second or alpha key is pressed, and the modes like deg, real, etc.
//also add undo list to state

type calcState = {
  input: string;
  inputHist: string[];
  cursorPos: number;
  alpha: boolean;
  second: boolean;
};

type keyFunction = (input: calcState) => calcState;

/**
 * This class is made to interpret each character id
 */
class key {
  Norm: string | keyFunction;
  Alpha: string | keyFunction;
  Second: string | keyFunction;

  constructor(
    Norm: string | keyFunction,
    Second: string | keyFunction = "",
    Alpha: string | keyFunction = ""
  ) {
    this.Norm = Norm;
    this.Second = Second;
    this.Alpha = Alpha;
  }

  onPress(state: calcState): calcState {
    let result;
    if (state.second) {
      state.second = false;
      result = this.handleMod(state, this.Second);
    } else if (state.alpha) {
      state.alpha = false;
      result = this.handleMod(state, this.Alpha);
    } else {
      result = this.handleMod(state, this.Norm);
    }

    //only add to the history if its unique
    let isNew =
      result.inputHist.length === 0 || result.inputHist[0] != result.input;
    let isLarger = state.inputHist.length <= result.inputHist.length;
    if (isNew && isLarger) {
      console.log("added to array");
      result.inputHist.unshift(result.input);
    }
    return result;
  }

  handleMod(state: calcState, action: string | keyFunction): calcState {
    let result;
    if (isKeyFunction(action)) {
      result = action(state);
    } else {
      //TODO check if the action ends in a

      let newInput =
        state.input.substring(0, state.cursorPos) +
        action +
        state.input.substring(state.cursorPos, state.input.length);
      let newCursor = state.cursorPos + action.length;

      if (action.slice(-1) == "(") {
        newInput += ")";
      } else if (action.slice(-1) == "{") {
        newInput += "}";
      }
      result = {
        ...state,
        input: newInput,
        cursorPos: newCursor,
      };
    }

    return result;
  }
}

function isKeyFunction(key: string | keyFunction): key is keyFunction {
  return typeof key == "function";
}

function handleSecond(state: calcState): calcState {
  //emit second
  return {
    ...state,
    second: true,
  };
}

function handleBacksp(state: calcState): calcState {
  let newState = {
    ...state,
    input: state.input.slice(0, -1),
  };
  return newState;
}

function handleUndo(state: calcState): calcState {
  let newState = { ...state, inputHist: [...state.inputHist] };

  if (newState.inputHist.length > 1) {
    newState.input = newState.inputHist[1];
    newState.inputHist.shift();
  } else {
    newState.input = "";
    newState.inputHist = [];
  }

  console.log(state, newState);
  return newState;
}

function handleAlpha(state: calcState): calcState {
  return {
    ...state,
    alpha: true,
  };
}

function handleAlphaLock(state: calcState): calcState {
  //emit alpha lock
  return state;
}

function handleCurVar(state: calcState): calcState {
  //add the variable of the current mode X/theta/n/T
  return state;
}

function handleVars(state: calcState): calcState {
  //open a menu of all the variables being used
  return state;
}

function handleMathMenu(state: calcState): calcState {
  //open a menu with extra math symbols and functions
  return state;
}

function handleLogicMenu(state: calcState): calcState {
  //open a menu with extra logic symbols and functions
  return state;
}

function handleclear(state: calcState): calcState {
  //clears the input
  return {
    ...state,
    input: "",
  };
}

function handleCstmMenu(state: calcState): calcState {
  //open a menu that allows users to customize their calculator
  return state;
}

function handleOnOff(state: calcState): calcState {
  //open a menu that allows users to customize their calculator
  return state;
}

function handleMode(state: calcState): calcState {
  //open a menu that allows users to customize their calculator
  return state;
}

function handleLeftArrow(state: calcState): calcState {
  //open a menu that allows users to customize their calculator
  let newCursorPose = state.cursorPos - 1;

  if (newCursorPose < 0) {
    newCursorPose = 0;
  }

  let newState = {
    ...state,
    cursorPos: newCursorPose,
  };

  return newState;
}

function handleRightArrow(state: calcState): calcState {
  //open a menu that allows users to customize their calculator
  let newCursorPose = state.cursorPos + 1;

  if (newCursorPose > state.input.length) {
    newCursorPose = state.input.length;
  }

  return {
    ...state,
    cursorPos: newCursorPose,
  };
}

const sciKeys: Record<string, key> = {
  second: new key(handleSecond),
  func_: new key("", "", ""),
  func_backsp: new key(handleBacksp, handleUndo),
  //TODO Add arrow Functionality
  arrow_up: new key(""),
  arrow_right: new key(handleRightArrow),
  arrow_down: new key(""),
  arrow_left: new key(handleLeftArrow),
  arrow_sel: new key(""),

  alpha: new key(handleAlpha, handleAlphaLock),

  func_var: new key(handleCurVar, handleVars),
  menu_math: new key(handleMathMenu, handleLogicMenu),
  func_clr: new key(handleclear, handleCstmMenu),
  func_sin: new key("sin(", "arcsin("),
  func_cos: new key("cos(", "arccos("),
  func_tan: new key("tan(", "arctan("),
  func_exp: new key("^(", "pi"),
  func_square: new key("^2", "sqrt("),
  func_lparen: new key("("),
  func_rparen: new key(")"),
  op_div: new key("/"),
  func_log: new key("log(", "10^("),

  num_7: new key("7"),
  num_8: new key("8"),
  num_9: new key("9"),
  num_4: new key("4"),
  num_5: new key("5"),
  num_6: new key("6"),
  num_1: new key("1"),
  num_2: new key("2"),
  num_3: new key("3"),
  num_0: new key("0"),
  num_per: new key("."),
  num_neg: new key("-"), //might want to make it a diff symbol than the subtract but fine for now

  op_mult: new key("*"),
  func_ln: new key("ln(", "e^("),

  op_sub: new key("-"),
  op_add: new key("+"),
  sys_on: new key(handleOnOff, handleMode),
  //op_enter should be already taken care of
};

export { sciKeys };

export type { calcState };
