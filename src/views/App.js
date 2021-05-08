import {Provider} from "react-redux"; // Automatically passes the store to all child components
import store from "../redux/store"; // The store and main reducer
import Home from "../components/Home";

const App = () => {
  

  return (
  <>
    <Provider store={store}>
      <Home />
    </Provider>
  </>
  )
}

export default App;
