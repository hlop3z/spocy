# **Spocy** — Easy Store(Vuex) Manager.

> **Plugin** for `Vuex`

## Install

```sh
npm install spocy
```

---

## Usage: **Init**

```js
import Spocy from "spocy";
import store from "./store";

// Plugin for Vuex
const spocy = Spocy(store);
```

---

## Usage: **`ref`**

```js
// Init
const ref = spocy.ref(10);

// Test
console.log(ref.value);
```

---

## Usage: **`model`**

```js
// Init
const model = spocy.model();

// Test
console.log(model.item.value);
console.log(model.list.value);
console.log(model.history.item.value);
console.log(model.history.list.value);
```

---

## Usage: **`dict`**

```js
// Init
const dict = spocy.dict({ id: 1, name: "john" });

// Test
console.log(dict.id.value);
```

---

## Usage: **`table`**

```js
// Init
const table = spocy.table(["role", "user"]);

// Test
table.role.item.value = { name: "admin" };

console.log(table.role.item.value.name);
console.log(table.role.list.value);
console.log(table.role.history.item.value);
console.log(table.role.history.list.value);
```
