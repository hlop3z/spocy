/* eslint-disable */  
// src/namespaceID.js
function storeCreateID(size = 36, choices = "0123456789abcdefghijklmnopqrstuvwxyz", text = "") {
  let $text = text;
  for (let i = 0; i < size; i += 1) {
    $text += choices.charAt(Math.floor(Math.random() * choices.length));
  }
  return $text;
}
var IDTracker = class {
  constructor() {
    this.$items = {};
    this.$keys = /* @__PURE__ */ new Set();
  }
  get keys() {
    return this.$keys;
  }
  create() {
    let currentID = null;
    let found = true;
    while (found) {
      currentID = storeCreateID();
      found = this.$keys.has(currentID);
    }
    if (!found) {
      this.$keys.add(currentID);
    }
    return currentID;
  }
};
var refID = new IDTracker();
var modelID = new IDTracker();
var namespaceID_default = {
  ref: () => refID.create(),
  model: () => modelID.create()
};

// src/namespace.js
function storeCreateModel(app, namespace, key) {
  const model = {};
  model.key = `${app}.${namespace}.${key}`;
  model.value = `${model.key}/value`;
  return model;
}
var createModelBase = (app) => (namespace, key) => storeCreateModel(app, namespace, key);
var createModelCore = {
  item: (key) => createModelBase("db")("instance", key),
  list: (key) => createModelBase("db")("objects", key),
  history: {
    item: (key) => createModelBase("db")("history.instance", key),
    list: (key) => createModelBase("db")("history.objects", key)
  }
};
function createModel(key, history = false) {
  const items = {
    item: createModelCore.item(key),
    list: createModelCore.list(key)
  };
  if (history) {
    items.history = {
      item: createModelCore.history.item(key),
      list: createModelCore.history.list(key)
    };
  }
  return items;
}
var createRef = (key) => createModelBase("store")("ref", key);
var Namespace = {
  ref: createRef,
  model: createModel
};
var StoreIDS = {
  ref: () => Namespace.ref(namespaceID_default.ref()),
  model: {
    simple: () => Namespace.model(namespaceID_default.model()),
    history: () => Namespace.model(namespaceID_default.model(), true)
  }
};
var namespace_default = StoreIDS;

// src/vuex.js
var DynamicVuex = {
  namespaced: true,
  state() {
    return {
      value: null
    };
  },
  mutations: {
    setValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    value(context, value) {
      context.commit("setValue", value);
    }
  },
  getters: {
    value(state) {
      return state.value;
    }
  }
};
var StoreObjRef = class {
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
};
function ManageVuexRef(store, value) {
  const model = namespace_default.ref();
  return new StoreObjRef(store, model, value);
}
function ManageVuexModel(store, withHistory = true) {
  const { item, list, history } = namespace_default.model.history();
  const returnValue = {
    item: new StoreObjRef(store, item, {}),
    list: new StoreObjRef(store, list, [])
  };
  if (withHistory) {
    returnValue.history = {
      item: new StoreObjRef(store, history.item, {}),
      list: new StoreObjRef(store, history.list, [])
    };
  }
  return returnValue;
}
var vuex_default = {
  ref: (store) => (value) => ManageVuexRef(store, value),
  model: (store) => (history) => ManageVuexModel(store, history)
};

// src/index.js
function createRefs(store, models) {
  const $ref = vuex_default.ref(store);
  const returnValue = {};
  const allKeys = Object.keys(models);
  allKeys.forEach((key) => {
    returnValue[key] = $ref(models[key]);
  });
  return returnValue;
}
function createModels(store, models) {
  const $model = vuex_default.model(store);
  const returnValue = {};
  models.forEach((key) => {
    returnValue[key] = $model();
  });
  return returnValue;
}
var src_default = (store) => ({
  ref: vuex_default.ref(store),
  model: vuex_default.model(store),
  table: (models) => createModels(store, models),
  dict: (models) => createRefs(store, models)
});
export {
  src_default as default
};
