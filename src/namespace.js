import ID from './namespaceID';

function storeCreateModel(app, namespace, key) {
  const model = {};
  model.key = `${app}.${namespace}.${key}`;
  model.value = `${model.key}/value`;
  return model;
}

const createModelBase = (app) => (namespace, key) => storeCreateModel(app, namespace, key);

const createModelCore = {
  item: (key) => createModelBase('db')('instance', key),
  list: (key) => createModelBase('db')('objects', key),
  history: {
    item: (key) => createModelBase('db')('history.instance', key),
    list: (key) => createModelBase('db')('history.objects', key),
  },
};

function createModel(key, history = false) {
  const items = {
    item: createModelCore.item(key),
    list: createModelCore.list(key),
  };
  if (history) {
    items.history = {
      item: createModelCore.history.item(key),
      list: createModelCore.history.list(key),
    };
  }
  return items;
}

const createRef = (key) => createModelBase('store')('ref', key);

const Namespace = {
  ref: createRef,
  model: createModel,
};

const StoreIDS = {
  ref: () => Namespace.ref(ID.ref()),
  model: {
    simple: () => Namespace.model(ID.model()),
    history: () => Namespace.model(ID.model(), true),
  },
};

export default StoreIDS;
