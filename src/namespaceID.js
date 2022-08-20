function storeCreateID(
  size = 36,
  choices = "0123456789abcdefghijklmnopqrstuvwxyz",
  text = ""
) {
  let $text = text;
  for (let i = 0; i < size; i += 1) {
    $text += choices.charAt(Math.floor(Math.random() * choices.length));
  }
  return $text;
}

class IDTracker {
  constructor() {
    this.$items = {};
    this.$keys = new Set();
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
}

const refID = new IDTracker();
const modelID = new IDTracker();

export default {
  ref: () => refID.create(),
  model: () => modelID.create(),
};
