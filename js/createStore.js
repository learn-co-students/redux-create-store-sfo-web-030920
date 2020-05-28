// wrap state in function to protect from accidental reassignment
function createStore(reducer) {
  let state;

  // state is now accessible to dispatch
  // just created a closure by moving dispatch inside another function
  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  // need to expose state so we can retrieve it outside this function
  function getState() {
    return state;
  }

  // need to expose dispatch method to the public because we'll need to call it when certain events happen
  // returned object called store
  return { dispatch: dispatch, getState };
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREASE_COUNT":
      return { count: state.count + 1 };

    default:
      return state;
  }
}

function render() {
  let container = document.getElementById("container");
  container.textContent = store.getState().count;
}

// dispatch({ type: "@@INIT" });
let button = document.getElementById("button");

// store contains all our app's state and a dispatch method
// can dispatch actions that modify state
// createStore takes a reducer as an argument
let store = createStore(reducer);
store.dispatch({ type: "@@INIT" });

button.addEventListener("click", function () {
  store.dispatch({ type: "INCREASE_COUNT" });
});
