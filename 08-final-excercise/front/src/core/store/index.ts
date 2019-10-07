import { combineReducers } from "redux";
import * as CoreModel from "./state.model";
export { CoreModel };

import {
  registerCollectionReducer,
  RegisterCollectionState
} from "./register-collection.reducer";

interface CoreRootState {
  registerCollectionState: RegisterCollectionState;
}

export const coreRootReducer = combineReducers<CoreRootState>({
  registerCollectionState: registerCollectionReducer
});
