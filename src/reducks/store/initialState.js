const initialState = {
    loading: {
        state: false,
        text: '',
    },
    users: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: "",
        groups: [],
        groupName: [],
    },

    groups: {
        id: '',
        groupName: '',
        groupDescription: '',
        administrators: [],
        updated_at: '',
        leader: '',
        URLs: '',
        menbers: [],
        menberName: [],
        tenMenbers: [],
        tenMenberName: [],
    },
}

export default initialState;
