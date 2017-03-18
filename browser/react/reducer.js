

let initialState = {

}

//Reducer
export default (state = initialState, action) => {


  let newState = Object.assign({}, state);

  switch (action.type) {


    default:
      newState = state;
  }
  return newState;
}
