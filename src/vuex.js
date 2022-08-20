import Namespace from "./namespace";

const DynamicVuex = {
  namespaced: !0,
  state() {
    return {
      value: null,
    };
  },
  mutations: {
    setValue(state, value) {
      state.value = value;
    },
  },
  actions: {
    value(context, value) {
      context.commit("setValue", value);
    },
  },
  getters: {
    value(state) {
      return state.value;
    },
  },
};

class StoreObjRef {
  constructor(store, model, value = null) {
    store.registerModule(model.key, DynamicVuex);
    store.dispatch(model.value, value);
    this.$key = model.value;
    this.$store = store;
  }

  get value() {
    return this.$store.getters[this.$key];
  }

  set value(value) {
    this.$store.dispatch(this.$key, value);
  }
}

function ManageVuexRef(store, value) {
  const model = Namespace.ref();
  return new StoreObjRef(store, model, value);
}
function ManageVuexModel(store, withHistory = true) {
  const { item, list, history } = Namespace.model.history();
  const returnValue = {
    item: new StoreObjRef(store, item, {}),
    list: new StoreObjRef(store, list, []),
  };
  if (withHistory) {
    returnValue.history = {
      item: new StoreObjRef(store, history.item, {}),
      list: new StoreObjRef(store, history.list, []),
    };
  }
  return returnValue;
}

export default {
  ref: (store) => (value) => ManageVuexRef(store, value),
  model: (store) => (history) => ManageVuexModel(store, history),
};
