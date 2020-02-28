export const Types = {
  DESPESA_CLICK: "newLancamento/DESPESA_CLICK",
  RECEITA_CLICK: "newLancamento/RECEITA_CLICK",
  TRANSFERENCIA_CLICK: "newLancamento/TRANSFERENCIA_CLICK",
  VALOR_CHANGE: "newLancamento/VALOR_CHANGE",
  DATA_CHANGE: "newLancamento/DATA_CHANGE",
  CARTEIRA_CHANGE: "newLancamento/CARTEIRA_CHANGE",
  OBS_CHANGE: "newLancamento/OBS_CHANGE"
};

const INITIAL_STATE = {
  receita: false,
  despesa: true,
  transferencia: false,
  carteiras: [],
  valor: 0,
  dataMovimento: new Date(),
  carteiraId: 0,
  obs: "",
  autoLancamentos: [],
  autoLancamentoId: 0,
  error: false
};

export default function newLancamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.DESPESA_CLICK:
      return { ...state, despesa: true, receita: false, transferencia: false };
    case Types.RECEITA_CLICK:
      return { ...state, despesa: false, receita: true, transferencia: false };
    case Types.TRANSFERENCIA_CLICK:
      return { ...state, despesa: false, receita: false, transferencia: true };
    case Types.VALOR_CHANGE:
      return { ...state, valor: action.valor };
    case Types.DATA_CHANGE:
      return { ...state, dataMovimento: action.dataMovimento };
    case Types.CARTEIRA_CHANGE:
      return { ...state, carteiraId: action.carteiraId };
    case Types.OBS_CHANGE:
      console.log(action.obs);
      return { ...state, obs: action.obs };
  }

  return state;
}

export const Creators = {
  despesaClick: () => {
    return {
      type: Types.DESPESA_CLICK
    };
  },

  receitaClick: () => {
    return {
      type: Types.RECEITA_CLICK
    };
  },

  transferenciaClick: () => {
    return {
      type: Types.TRANSFERENCIA_CLICK
    };
  },

  handlerChangeValor: valor => {
    return {
      type: Types.VALOR_CHANGE,
      valor: valor
    };
  },

  handlerChangeData: data => {
    return {
      type: Types.DATA_CHANGE,
      dataMovimento: data
    };
  },

  handlerChangeCarteira: carteira => {
    return {
      type: Types.CARTEIRA_CHANGE,
      carteiraId: carteira
    };
  },

  handlerChangeObs: obs => {
    return {
      type: Types.OBS_CHANGE,
      obs: obs
    };
  },

  handlerChangeAutoLan: autolan => {
    return {
      type: Types.AUTOLAN_CHANGE,
      autolanId: autolan
    };
  }
};
