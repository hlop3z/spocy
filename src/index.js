import DynamicVuex from "./vuex";

function createRefs(store, models) {
  const $ref = DynamicVuex.ref(store);
  const returnValue = {};
  const allKeys = Object.keys(models);
  allKeys.forEach((key) => {
    returnValue[key] = $ref(models[key]);
  });
  return returnValue;
}

function createModels(store, models) {
  const $model = DynamicVuex.model(store);
  const returnValue = {};
  models.forEach((key) => {
    returnValue[key] = $model();
  });
  return returnValue;
}

export default (store) => ({
  ref: DynamicVuex.ref(store),
  model: DynamicVuex.model(store),
  table: (models) => createModels(store, models),
  dict: (models) => createRefs(store, models),
});
