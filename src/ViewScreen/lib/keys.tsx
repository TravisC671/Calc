//state includes the current input string, if the second or alpha key is pressed, and the modes like deg, real, etc.
//also add undo list to state

type calcState = {
    input: string;
    alpha: boolean;
    second: boolean;
}

type keyFunction = ((input: calcState) => string)

/**
 * This class is made to interpret each character id
 */
class key {
    Norm: string | keyFunction
    Alpha: string | keyFunction
    Second: string | keyFunction

    constructor(
            Norm: string | keyFunction, 
            Second: string | keyFunction = "",
            Alpha: string | keyFunction = ""
        ) {
        this.Norm = Norm
        this.Second = Second
        this.Alpha = Alpha
    }

    onPress(state: calcState): string {
        if (state.second) {
            return this.handleMod(state, this.Second)
        } else if (state.alpha) {
            return this.handleMod(state, this.Alpha)
        } else {
            return this.handleMod(state, this.Norm)
        }
    }

    handleMod(state: calcState, action: string | keyFunction): string {
        if (isKeyFunction(action)) {
            action(state);
        } else {
            return state.input + action;
        }
        return state.input
    }
}

function isKeyFunction(key: string | keyFunction): key is keyFunction {
    return typeof key == "function"
}

function handleSecond(state: calcState): string {
    //emit second
    return state.input
}

function handleBacksp(state: calcState): string {
    //remove the last item in the string/token
    return state.input
}

function handleUndo(state: calcState): string {
    //get the undo list from the state
    return state.input
}

function handleAlpha(state: calcState): string {
    //emit alpha
    return state.input
}

function handleAlphaLock(state: calcState): string {
    //emit alpha lock
    return state.input
}

function handleCurVar(state: calcState): string {
    //add the variable of the current mode X/theta/n/T
    return state.input
}

function handleVars(state: calcState): string {
    //open a menu of all the variables being used
    return state.input
}

function handleMathMenu(state: calcState): string {
    //open a menu with extra math symbols and functions
    return state.input
}

function handleLogicMenu(state: calcState): string {
    //open a menu with extra logic symbols and functions
    return state.input
}

function handleclear(state: calcState): string {
    //clears the input
    state.input = "" //get rid of undef
    return ""
}

function handleCstmMenu(state: calcState): string {
    //open a menu that allows users to customize their calculator
    return state.input
}

function handleOnOff(state: calcState): string {
    //open a menu that allows users to customize their calculator
    return state.input
}

function handleMode(state: calcState): string {
    //open a menu that allows users to customize their calculator
    return state.input
}

const sciKeys:Record<string,key> = {
    second: new key("2nd", handleSecond),
    func_: new key("", "", ""),
    func_backsp: new key(handleBacksp, handleUndo),
    //TODO Add arrow Functionality
    arrow_up: new key("up"),
    arrow_right: new key("right"),
    arrow_down: new key("down"),
    arrow_left: new key("left"),
    arrow_sel: new key("sel"),

    alpha: new key(handleAlpha, handleAlphaLock),

    func_var: new key(handleCurVar, handleVars),
    menu_math: new key(handleMathMenu, handleLogicMenu),
    func_clr: new key(handleclear, handleCstmMenu),
    func_sin: new key("sin(", "arcsin("),
    func_cos: new key("cos(", "arccos("),
    func_tan: new key("tan(", "arctan("),
    func_exp: new key("^", "pi"),
    func_square: new key("^2", "sqrt("),
    func_lparen: new key("("),
    func_rparen: new key(")"),
    op_div: new key("/"),
    func_log: new key("log(", "10^{"),

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
    num_neg: new key("-"),//might want to make it a diff symbol than the subtract but fine for now

    op_mult: new key("*"),
    func_ln: new key("ln(", "e^{"),

    op_sub: new key("-"),
    op_add: new key("+"),
    sys_on: new key(handleOnOff, handleMode)
    //op_enter should be already taken care of
}

export { sciKeys }

export type { calcState }