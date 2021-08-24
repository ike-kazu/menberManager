import {signInAction, signOutAction} from './actions';
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp } from '../../firebase/index';

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                // uidはある
                const uid = user.uid;
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data();
                        if(!data){
                            throw new Error('ユーザーデータが存在しません');
                        }
                       return data
                    })
                    .then((data) => {
                        let groupNames = [];
                        if(data.groups[0]){
                            data.groups.map((groupId, index) => {
                                db.collection('groups').doc(groupId).get()
                                .then((content) => {
                                    const groupName = content.data().groupName;
                                    groupNames = [...groupNames, groupName];
                                    if(index === data.groups.length-1){
                                        dispatch(signInAction({
                                            isSignedIn: true,
                                            role: data.role,
                                            uid: uid,
                                            username: data.username,
                                            groups: data.groups,
                                            groupName: groupNames,
                                        }));
                                    }
                                });
                            });
                        }
                        else{
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                                groups: data.groups,
                                groupName: [],
                            }));
                        }

                    })
            }else {
                dispatch(push('/signin'));
            }
        });
    }
}

export const signIn = (email, password) => {

    const createGroupName = async (groups) => {
        let groupName = [];
        await Promise.all(
            groups.map((groupId) => {
                db.collection('groups').doc(groupId).get()
                .then(content => {
                    groupName.push(content.data().groupName);
                })
            })
        )
        return groupName;
    }

    return async (dispatch) => {
        if (email === '' || password === ''){
            alert('必須項目が未入力です');
            return false;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;

                if(user){
                    const uid = user.uid;

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data();
                            createGroupName(data.groups);
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                                groups: data.groups,
                                groupName: createGroupName(data.groups),
                            }));
                            dispatch(push('/'));
                        });
                }else{
                    dispatch(push('/signin'));
                }
            })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        if (username === '' || email === '' || password === '' || confirmPassword === ''){
            alert('必須項目が未入力です');
            return false;
        }
        if (password !== confirmPassword){
            alert('パスワードが一致しません。もう一度お試しください');
            return false;
        }
        return auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const user = result.user;

                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();
                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: 'customer',
                        uploaded_at: timestamp,
                        username: username,
                        groups: [],
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                    .then(() => {
                        dispatch(push('/'));
                    });
                }
            })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ''){
            alert('必須項目が未入力です');
            return false;
        }else{
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたメールアドレスにリセット用のURLを送りました');
                    dispatch(push('/signin'));
                }).catch(() => {
                    alert('パスワードリセットに失敗しました。');
                })
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'));
            });
    }
}


export const joinGroup = (userId, groupId) => {
    return async () => {
       db.collection('users').doc(userId).get()
       .then((content) => {
           const joinMenberData = content.data();
           return joinMenberData
       })
       .then((joinMenberData) => {
            db.collection('users').doc(userId).update({groups: [...joinMenberData.groups, groupId]})
       })
    }
}


export const getMenberName = (menbers, menberName, setMenberName) => {
    return async () => {
        menbers.map((menber) => {
            db.collection('users').doc(menber).get()
            .then((content) => {
                setMenberName([...menberName, content.data().username]);
            })
        })
    }
}
