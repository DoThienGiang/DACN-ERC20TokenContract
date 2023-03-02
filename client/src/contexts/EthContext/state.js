const actions = {
  init: "INIT",
};

const initialState = {
  loaded: false,
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contracts: null,
  tokenSaleAddress: null,
  userTokens: 0,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
