import {createSelector} from 'reselect';


const groupSelector = (state) => state.groups;

export const getGroupId = createSelector(
    [groupSelector],
    state => state.id
);

export const getGroupAdministrators = createSelector(
    [groupSelector],
    state => state.administrators
);

export const getGroupTenMenbers = createSelector(
    [groupSelector],
    state => state.tenMenbers
);

export const getGroupTenMenberName = createSelector(
    [groupSelector],
    state => state.tenMenberName
);

export const getGroupMenbers = createSelector(
    [groupSelector],
    state => state.menbers
);

export const getGroupName = createSelector(
    [groupSelector],
    state => state.groupName
);

export const getGroupDescription = createSelector(
    [groupSelector],
    state => state.groupDescription
);

export const getGroupMenberName = createSelector(
    [groupSelector],
    state => state.menberName
);

export const getGroupURL = createSelector(
    [groupSelector],
    state => state.URLs
);

export const getGroupLeader = createSelector(
    [groupSelector],
    state => state.leader
);