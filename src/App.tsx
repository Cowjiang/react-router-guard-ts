import './App.css';
import {onRouteBefore, routes} from './router';
import RouterGuard from './router/guard';

function App() {
  return (
    <div>
      <RouterGuard
        routers={routes}
        onRouterBefore={onRouteBefore}
      />
    </div>
  );
}

export default App;