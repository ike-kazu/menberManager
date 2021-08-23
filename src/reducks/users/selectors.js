import {createSelector} from 'reselect';


const userSelector = (state) => state.users;


export const getIsSignedIn = createSelector(
    [userSelector],
    state => state.isSignedIn
);

export const getUserId = createSelector(
    [userSelector],
    state => state.uid
);

export const getUsername = createSelector(
    [userSelector],
    state => state.username
);

export const getGroupName = createSelector(
    [userSelector],
    state => state.groupName
);

export const getGroups = createSelector(
    [userSelector],
    state => state.groups
);
