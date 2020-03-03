export const Types = {
  DESPESA_CLICK: "lancamento/DESPESA_CLICK",
  RECEITA_CLICK: "lancamento/RECEITA_CLICK",
  TRANSFERENCIA_CLICK: "lancamento/TRANSFERENCIA_CLICK",

  LOAD_AUTOLANCAMENTO: "lancamento/LOAD_AUTOLANCAMENTO",
  LOAD_CARTEIRAS: "lancamento/LOAD_CARTEIRAS",
  LOAD_CARTEIRAS_DESTINOS: "lancamento/LOAD_CARTEIRAS_DESTINOS",
  LOAD_FORNECEDORES: "lancamento/LOAD_FORNECEDORES",
  LOAD_CLIENTES: "lancamento/LOAD_CLIENTES",
  LOAD_SERVICOS: "lancamento/LOAD_SERVICOS",
  LOAD_CONTAS_CONTABEIS: "lancamento/LOAD_CONTAS_CONTABEIS",

  VALOR_CHANGE: "lancamento/VALOR_CHANGE",
  DATA_CHANGE: "lancamento/DATA_CHANGE",
  CARTEIRA_CHANGE: "lancamento/CARTEIRA_CHANGE",
  OBS_CHANGE: "lancamento/OBS_CHANGE",
  AUTOLAN_CHANGE: "lancamento/AUTOLAN_CHANGE",
  CONTA_CONTABIL_CHANGE: "lancamento/CONTA_CONTABIL_CHANGE",
  FORNECEDOR_CHANGE: "lancamento/FORNECEDOR_CHANGE",
  CLIENTE_CHANGE: "lancamento/CLIENTE_CHANGE",
  CARTEIRA_DESTINO_CHANGE: "lancamento/CARTEIRA_DESTINO_CHANGE",
  SERVICO_CHANGE: "lancamento/SERVICO_CHANGE",

  TOGGLE_VALOR_EDITING: "lancamento/TOGGLE_VALOR_EDITING",

  PROCESSING: "lancamento/PROCESSING",
  PROCESSED: "lancamento/PROCESSED",
  PROCESS_ERRO: "lancamento/PROCESS_ERRO",
  SUCCESS_SAVE: "lancamento/SUCCESS_SAVE",
  ERROR_SAVE: "lancamento/ERROR_SAVE",
  REMOVE_SUCCESS: "lancamento/REMOVE_SUCCESS"
};

const INITIAL_STATE = {
  receita: false,
  despesa: true,
  transferencia: false,
  carteiras: [],
  carteiraId: 0,
  valor: 0,
  dataMovimento: new Date(),
  obs: "",
  autoLancamentos: [],
  autoLancamentoId: 0,
  error: false,

  contasContabeis: [],
  contaContabilId: 0,
  fornecedores: [],
  fornecedorNome: "",
  fornecedorId: 0,

  servicos: [],
  servicoId: 0,
  clientes: [],
  clienteNome: "",
  clienteId: 0,

  carteirasDestino: [],
  carteiraDestinoId: 0,

  valorEditing: false,

  processing: false,
  erroSave: false,
  successSave: false
};

export default function newLancamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.DESPESA_CLICK:
      return { ...state, despesa: true, receita: false, transferencia: false };

    case Types.RECEITA_CLICK:
      return { ...state, despesa: false, receita: true, transferencia: false };

    case Types.TRANSFERENCIA_CLICK:
      return { ...state, despesa: false, receita: false, transferencia: true };

    case Types.LOAD_AUTOLANCAMENTO:
      return {
        ...state,
        autoLancamentos: action.autoLancamentos,
        autoLancamentoId: action.autoLancamentoId
      };

    case Types.LOAD_CARTEIRAS:
      return {
        ...state,
        carteiras: action.carteiras,
        carteiraId: action.carteiraId
      };

    case Types.LOAD_CARTEIRAS_DESTINOS:
      return {
        ...state,
        carteirasDestino: action.carteirasDestino,
        carteiraDestinoId: action.carteiraDestinoId
      };

    case Types.LOAD_FORNECEDORES:
      return { ...state, fornecedores: action.fornecedores };

    case Types.LOAD_CLIENTES:
      return { ...state, clientes: action.clientes };

    case Types.LOAD_SERVICOS:
      return {
        ...state,
        servicos: action.servicos,
        servicoId: action.servicoId
      };

    case Types.LOAD_CONTAS_CONTABEIS:
      return { ...state, contasContabeis: action.contasContabeis };

    case Types.ERROR:
      return { ...state, despesa: false, receita: false, transferencia: true };

    case Types.PROCESSING:
      return {
        ...state,
        processing: true,
        erroSave: false,
        successSave: false,
        error: false
      };

    case Types.PROCESSED:
      return {
        ...state,
        processing: false
      };

    case Types.PROCESS_ERRO:
      return {
        ...state,
        processing: false,
        error: true
      };

    case Types.SUCCESS_SAVE:
      return {
        ...state,
        processing: false,
        erroSave: false,
        successSave: true,
        error: false
      };

    case Types.ERROR_SAVE:
      return {
        ...state,
        processing: false,
        erroSave: true,
        successSave: false,
        error: false
      };

    case Types.REMOVE_SUCCESS:
      return { ...state, successSave: false };

    case Types.VALOR_CHANGE:
      return { ...state, valor: action.valor };

    case Types.DATA_CHANGE:
      return { ...state, dataMovimento: action.dataMovimento };

    case Types.CARTEIRA_CHANGE:
      return { ...state, carteiraId: action.carteiraId };

    case Types.OBS_CHANGE:
      return { ...state, obs: action.obs };

    case Types.FORNECEDOR_CHANGE:
      return {
        ...state,
        fornecedorNome: action.fornecedorNome,
        fornecedorId: action.fornecedorId
      };

    case Types.AUTOLAN_CHANGE:
      return {
        ...state,
        autoLancamentoId: action.autoLancamentoId
      };

    case Types.CONTA_CONTABIL_CHANGE:
      return {
        ...state,
        contaContabilId: action.contaContabilId
      };

    case Types.CLIENTE_CHANGE:
      return {
        ...state,
        clienteNome: action.clienteNome,
        clienteId: action.clienteId
      };

    case Types.CARTEIRA_DESTINO_CHANGE:
      return {
        ...state,
        carteiraDestinoId: action.carteiraDestinoId
      };

    case Types.SERVICO_CHANGE:
      return {
        ...state,
        servicoId: action.servicoId
      };

    case Types.TOGGLE_VALOR_EDITING:
      return {
        ...state,
        valorEditing: !state.valorEditing
      };
    default:
      return state;
  }
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

  loadAutoLancamentos: autolancamentos => {
    return {
      type: Types.LOAD_AUTOLANCAMENTO,
      autoLancamentos: autolancamentos,
      autoLancamentoId: autolancamentos.length > 1 ? autolancamentos[0].id : 0
    };
  },

  loadCarteiras: carteiras => {
    return {
      type: Types.LOAD_CARTEIRAS,
      carteiras: carteiras,
      carteiraId: carteiras.length > 1 ? carteiras[0].id : 0
    };
  },

  loadCarteirasDestinos: carteiras => {
    return {
      type: Types.LOAD_CARTEIRAS_DESTINOS,
      carteirasDestino: carteiras,
      carteiraDestinoId: carteiras.length > 1 ? carteiras[0].id : 0
    };
  },

  loadFornecedores: fornecedores => {
    return {
      type: Types.LOAD_FORNECEDORES,
      fornecedores: fornecedores
    };
  },

  loadClientes: clientes => {
    return {
      type: Types.LOAD_CLIENTES,
      clientes: clientes
    };
  },

  loadServicos: servicos => {
    return {
      type: Types.LOAD_SERVICOS,
      servicos: servicos,
      servicoId: servicos.length > 1 ? servicos[0].id : 0
    };
  },

  loadContasContabeis: contasContabeis => {
    return {
      type: Types.LOAD_CONTAS_CONTABEIS,
      contasContabeis: contasContabeis,
      contaContabilId:
        contasContabeis.length > 1 ? contasContabeis[0].ctaCtbl : 0
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
      obs: obs.toUpperCase()
    };
  },

  handlerChangeAutoLan: autolan => {
    return {
      type: Types.AUTOLAN_CHANGE,
      autolanId: autolan
    };
  },

  handlerChangeFornecedor: (fornecedorId, fornecedorNome) => {
    return {
      type: Types.FORNECEDOR_CHANGE,
      fornecedorId: fornecedorId,
      fornecedorNome: fornecedorNome.toUpperCase()
    };
  },

  handlerChangeContaContabil: contaContabilId => {
    return {
      type: Types.CONTA_CONTABIL_CHANGE,
      contaContabilId: contaContabilId
    };
  },

  handlerChangeCliente: (clienteId, clienteNome) => {
    return {
      type: Types.CLIENTE_CHANGE,
      clienteId: clienteId,
      clienteNome: clienteNome
    };
  },

  handlerChangeCarteiraDestino: carteiraDestinoId => {
    return {
      type: Types.CARTEIRA_DESTINO_CHANGE,
      carteiraDestinoId: carteiraDestinoId
    };
  },

  handlerChangeServico: servicoId => {
    return {
      type: Types.SERVICO_CHANGE,
      servicoId: servicoId
    };
  },

  toggleValorEditing: () => {
    return {
      type: Types.TOGGLE_VALOR_EDITING
    };
  },

  setProcessing: () => {
    return {
      type: Types.PROCESSING
    };
  },

  setProcessed: () => {
    return {
      type: Types.PROCESSED
    };
  },

  setProcessErro: () => {
    return {
      type: Types.PROCESS_ERRO
    };
  },

  setSuccessSave: () => {
    return {
      type: Types.SUCCESS_SAVE
    };
  },

  setErrorSave: () => {
    return {
      type: Types.ERROR_SAVE
    };
  },

  setRemoveSuccess: () => {
    return {
      type: Types.REMOVE_SUCCESS
    };
  }
};
