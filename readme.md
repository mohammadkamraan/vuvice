# Vuvice - A Reactive State Management Library

## Introduction

**Vuvice** is a powerful Vue.js package designed to help developers integrate object-oriented and service-based architectures into their applications. Unlike traditional state management tools, Vuvice focuses on providing a flexible architecture that allows developers to build Vue.js applications in a way that best suits their needs.

Vuvice isn't about competing with tools like Pinia or Vuex — instead, it complements them by offering an alternative approach for managing logic and structure in your application. With Vuvice, you can apply solid OOP principles and design patterns, making your codebase more modular, scalable, and maintainable.

Whether you're working on a large-scale enterprise app or a small side project, Vuvice empowers you to organize your application logic with clean, reusable services and class-based components — all while staying fully compatible with the Vue ecosystem.

---

## Features

- **BehaviorSubject**: A reactive data structure that holds a value and allows components to subscribe to changes.
- **`@UiSync` Decorator**: Automatically syncs getter methods to the UI, ensuring that the UI remains up-to-date with service data.
- **Manual Unsubscription**: Developers are responsible for manually unsubscribing from reactive values to prevent memory leaks.
- **Memory Management**: Vuvice handles subscriptions internally and helps manage the lifecycle of subscriptions within your components.
- **Easy-to-use API**: Provides a clean and straightforward API to manage reactive state and sync it with your Vue components.

---

## Installation

To install Vuvice, you can use npm:

```bash
npm install vuvice
```

---

## Core Concepts

### `BehaviorSubject`

A `BehaviorSubject` is a core component in Vuvice that holds and manages a reactive value. Components can subscribe to this value and receive updates whenever the value changes.

#### Methods

- **`next(value)`**: Updates the current value and notifies all subscribers.
- **`getValue()`**: Returns the current value of the `BehaviorSubject`.
- **`attach(observer)`**: Attaches an observer (or callback) to the `BehaviorSubject` to receive updates.
- **`detach(observer)`**: Detaches an observer from the `BehaviorSubject`.
- **`notify()`**: Notifies all attached observers with the latest value.

---

### `@UiSync` Decorator

The `@UiSync` decorator binds getter methods in services to reactive data sources and automatically keeps the UI in sync with the data.

#### Generics of `@UiSync` Decorator

The `@UiSync` decorator accepts two generic types:

1. **First Generic (`V`)**: Represents the type of the reactive value being observed in the `BehaviorSubject`.
2. **Second Generic (`T`)**: Represents the type returned by the updater function (the second argument passed to the decorator). This function can transform or modify the reactive value before it’s returned to the UI.

#### Example Usage:

```ts
@UiSync<{ title: string; id: string }[], { title: string; id: string }[]>('todos', (value) => value)
public getTodos(_id: string): UiConnection<{ title: string; id: string }[]> {
  return {
    value: this.todos.getValue()
  }
}
```

- **First Generic (`{ title: string; id: string }[]`)**: Represents the type of the reactive value inside the `BehaviorSubject` (an array of todos).
- **Second Generic (`{ title: string; id: string }[]`)**: Represents the return type of the updater function. In this case, it returns the same type (`{ title: string; id: string }[]`), but you could modify or transform the value in this function if needed.

---

### `useSubscribe` Hook

The `useSubscribe` hook subscribes to a `BehaviorSubject` and automatically updates the UI when the value changes. It manages the subscription lifecycle and unsubscribes when the component is unmounted. It **does not** return the `unSubscribe` method.

- **Subscription Management**: The hook subscribes to the `BehaviorSubject` and automatically updates the UI when the value changes. It handles the subscription lifecycle when the component mounts and unmounts.
- **No Unsubscription**: The `useSubscribe` hook **does not** return the `unSubscribe` method. Developers are expected to manage unsubscribing manually using the `unSubscribe` method provided by the `@UiSync` decorator.

---

## Example: Todo Service

### `TodosService.ts`

This service manages the todo list and exposes it reactively to the UI using Vuvice.

```ts
import { BehaviorSubject, type UiConnection, UiSync } from 'vuvice'

export class TodosService {
  private static Instance: TodosService | null = null

  // Internal reactive store for todos
  private todos = new BehaviorSubject<{ title: string; id: string }[]>([])

  private constructor() {}

  // Public method to add a new todo item
  public addTodo(title: string) {
    this.todos.next((currentTodos) => {
      currentTodos.push({ title, id: Math.random().toString() })
      return [...currentTodos]
    })
  }

  // Expose todos reactively to the UI
  @UiSync<{ title: string; id: string }[], { title: string; id: string }[]>('todos', (value) => value)
  public getTodos(_id: string): UiConnection<{ title: string; id: string }[]> {
    return {
      value: this.todos.getValue()
    }
  }

  // Singleton access to the service instance
  public static GetInstance() {
    if (!TodosService.Instance) {
      TodosService.Instance = new TodosService()
    }
    return TodosService.Instance
  }
}
```

---

## Example Usage in Vue Component

### `TodosList.vue`

In the `TodosList` component, you can subscribe to the `getTodos` method and automatically update the UI when the todo list changes. You need to pass the unique component ID to the decorated getter method.

```vue
<script setup lang="ts">
import { TodosService } from "@/TodosService.ts"
import { useComponentId } from "vuvice"
import { onBeforeUnmount } from "vue"

// Get the singleton instance of TodosService
const todosService = TodosService.GetInstance()

// Retrieve the unique component ID
const uuId = useComponentId().uuId

// Set up the subscription and retrieve the data using useSubscribe
const todos = useSubscribe(todosService.getTodos(uuId).value)

// Clean up by disconnecting from the BehaviorSubject
onBeforeUnmount(() => {
  todosService.getTodos(uuId).unSubscribe(uuId)
})
</script>

<template>
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.title }}
  </div>
</template>

<style scoped>
/* Add styles for the todo list */
</style>
```
