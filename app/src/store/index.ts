import { createStore as createEnhancedStore, combineReducers, applyMiddleware, compose, Store, AnyAction } from "redux"
import { profileReducer, ProfileState } from "~/store/profile/reducer"
import { globalApiErrorReducer, IGlobalApiErrorState } from "~/store/GlobalError"
import thunk from "redux-thunk"
import { RouterState, connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory, History } from "history"

type WindowWithReduxDevTools = typeof window & {
  __REDUX_DEVTOOLS_EXTENSION__: typeof compose
}

export type AppState = {
  profile: ProfileState
  router: RouterState
  globalApiError: IGlobalApiErrorState
}

export type AppStore = Store<AppState, AnyAction>

export function createStore(): { store: AppStore; history: History } {
  const history = createBrowserHistory()
  const reducers = combineReducers<AppState>({
    profile: profileReducer,
    router: connectRouter(history),
    globalApiError: globalApiErrorReducer
  })

  const storeEnhancers: any = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    // redux dev tools
    typeof (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: unknown) => f
  )

  const store = createEnhancedStore(reducers, storeEnhancers)
  return { store, history }
}
