import { actionsIds } from "../common/action-id";

export interface UserProfileState {
  firstname: string;
  lastname: string;
}

const defaultUserState = (): UserProfileState => ({
  firstname: "John",
  lastname: "Naukas"
});

export const userProfileReducer = (state = defaultUserState(), action) => {
  switch (action.type) {
    case actionsIds.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action.payload);
  }

  return state;
};

const handleUserProfileAction = (state: UserProfileState, firstname) => {
  return {
    ...state,
    firstname
  };
};
