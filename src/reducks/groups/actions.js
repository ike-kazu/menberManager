export const DELETE_GROUP = "DELETE_GROUP";
export const deleteGroupAction = () => {
    return {
        type: "DELETE_GROUP",
        payload: null,
    }
}

export const FETCH_GROUP = "FETCH_GROUP";
export const fetchGroupAction = (groupState) => {
    return {
        type: "FETCH_GROUP",
        payload: {
            id: groupState.id,
            groupName: groupState.groupName,
            groupDescription: groupState.groupDescription,
            administrators: [...groupState.administrators],
            updated_at: groupState.updated_at,
            leader: groupState.leader,
            URLs: [...groupState.URLs],
            menbers: [...groupState.menbers],
            menberName: [...groupState.menberName],
            tenMenbers: [...groupState.tenMenbers],
            tenMenberName: [...groupState.tenMenberName]
        },
    }
}