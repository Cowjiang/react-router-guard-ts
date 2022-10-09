# React Router Guard Typescript

## Description

`react-router-guard-ts` is based on `react 18`, `react-router 6` and `Typescript JSX`. It can realize the function of authentication, guard, lazy load, loading status and check of route by configuration.

## Basic Usage

### router/guard.tsx

First, you need to `save`
<a href="https://github.com/Cowjiang/react-router-guard-ts/blob/master/src/router/guard.tsx">this file</a>
to `./router/guard.tsx`

### App.tsx

```typescript jsx
import RouterGuard from './router/guard'
import {routes, onRouteBefore} from './router'

function App() {
  return (
    <RouterGuard
      routers={routes}
      onRouterBefore={onRouteBefore}
    />
  )
}
```

### router/index.ts
`Routes`
<a href="https://github.com/Cowjiang/react-router-guard-ts/blob/master/src/router/index.ts#L12">routes list config</a>
<br>
`Authentication`
<a href="https://github.com/Cowjiang/react-router-guard-ts/blob/master/src/router/index.ts#L58">guard config</a>
<br>
`Auth check`
<a href="https://github.com/Cowjiang/react-router-guard-ts/blob/master/src/router/index.ts#L55">guard config</a>