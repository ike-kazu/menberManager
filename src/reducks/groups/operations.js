import {FirebaseTimestamp, db} from '../../firebase/index';
import {push} from 'connected-react-router';
import { deleteGroupAction } from '../groups/actions';
import { fetchGroupAction } from './actions';
import { getGroupMenberName } from './selectors';
import {showLoadingAction, hideLoadingAction} from '../loading/actions';


const groupsRef = db.collection('groups');


export const GetGroup = (id) => {

    return async (dispatch, getState) => {
        dispatch(showLoadingAction('データを取得中...'));
        groupsRef.doc(id).get()
        .then(async (content) => {
            const groupData = content.data();
            return groupData
        })
        .then((groupData) => {
            let menberName = [];
            groupData.menbers.map((menber, index) => {
                db.collection('users').doc(menber).get()
                .then((content) => {
                    menberName.push(content.data().username);
                    if(index === groupData.menbers.length-1){
                        dispatch(fetchGroupAction({
                            id: id,
                            groupName: groupData.groupName,
                            groupDescription: groupData.groupDescription,
                            administrators: [...groupData.administrators],
                            updated_at: groupData.updated_at,
                            leader: groupData.leader,
                            URLs: groupData.URLs,
                            menbers: groupData.menbers,
                            menberName: menberName,
                            tenMenbers: groupData.tenMenbers,
                            tenMenberName: [],
                        }))
                    }
                })
            })
            return groupData
        })
        // メンバーのDBにグループを登録する処理は分けている
        .then((groupData) => {
            groupData.tenMenbers.map((tenMenber, index) => {
                let tenMenberName = [];
                db.collection('users').doc(tenMenber).get()
                    .then((content) => {

                        tenMenberName.push(content.data().username)

                        if(index === groupData.tenMenbers.length-1){
                            dispatch(fetchGroupAction({
                                id: id,
                                groupName: groupData.groupName,
                                groupDescription: groupData.groupDescription,
                                administrators: [...groupData.administrators],
                                updated_at: groupData.updated_at,
                                leader: groupData.leader,
                                URLs: groupData.URLs,
                                menbers: groupData.menbers,
                                menberName: getGroupMenberName(getState()),
                                tenMenbers: groupData.tenMenbers,
                                tenMenberName: tenMenberName,
                            }));
                        }
                    })
            })
            dispatch(hideLoadingAction());
        })
    }
}


export const saveGroup = (id, groupName, groupDescription, user_id, URLs, menbers, administrators, tenMenbers) => {
    return async (dispatch) => {
        dispatch(showLoadingAction('グループ情報を保存中...'));
        const timestamp = FirebaseTimestamp.now();

        const data = {
            groupName: groupName,
            groupDescription: groupDescription,
            administrators: [...administrators],
            updated_at: timestamp,
            leader: user_id,
            URLs: URLs,
            menbers: [...menbers],
            tenMenbers: [...tenMenbers],
        }

        if(id === undefined){
            const ref = groupsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
            data.menbers = [user_id];
            data.administrators = [user_id];

            dispatch(fetchGroupAction({
                groupName: data.groupName,
                groupDescription: data.groupDescription,
                administrators: [...data.administrators],
                created_at: data.created_at,
                updated_at: data.updated_at,
                id: data.id,
                leader: data.leader,
                URLs: data.URLs,
                menbers: data.menbers,
                tenMenbers: data.tenMenbers,
            }));
        }
        dispatch(hideLoadingAction());

        return groupsRef.doc(id).set(data, {marge: true})
            .then(() => {
                dispatch(push('/group/home/' + id));
            }).catch((error) => {
                throw new Error(error);
            })
    }
}


export const deleteGroup = (id) => {
    return async (dispatch, getState) => {
      groupsRef.doc(id).delete()
        .then(() => {
          const prevGroups = getState().groups.list
          const nextGroups = prevGroups.filter(product => product.id !== id)
          dispatch(deleteGroupAction(nextGroups))
        })
    }
  }


export const preJoined = (group_id, user_id, tenMenbers, groups) => {
    // 関数を return すると止まる
    return async () => {
        groupsRef.doc(group_id).update({tenMenbers: [...tenMenbers, user_id]})
        .catch((error) => {
            throw new Error(error);
        });
    }
}


export const exitGroup = (group_id, user_id, groupMenbers) => {
    // 関数を return すると止まる
    return async () => {
        const index = groupMenbers.indexOf(user_id);
        groupMenbers.splice(index, 1);
        groupsRef.doc(group_id).update({menbers: groupMenbers})
        .then(
            db.collection('users').doc(user_id).get()
            .then(content => {
                const userGroups = content.data().groups;
                const groupIndex = userGroups.indexOf(group_id);
                userGroups.splice(groupIndex, 1);
                db.collection('users').doc(user_id).update({groups: userGroups});
            })
        )
        .catch((error) => {
            throw new Error(error);
        });
    }
}


export const acceptUser = (index) => {
    return async (dispatch, getState) => {
        const groups = getState().groups;
        const groupsTenMenbers = groups.tenMenbers;
        const groupsTenMenberName = groups.tenMenberName;
        const joinMenbers = groupsTenMenbers[index];
        const joinMenberName = groups.tenMenberName[index];
        groupsTenMenbers.splice(index, 1);
        groupsTenMenberName.splice(index, 1);
        const data = {
            groupName: groups.groupName,
            groupDescription: groups.groupDescription,
            administrators: [...groups.administrators],
            created_at: groups.created_at,
            updated_at: groups.updated_at,
            id: groups.id,
            leader: groups.leader,
            URLs: groups.URLs,
            menbers: [...groups.menbers, joinMenbers],
            menberName: [...groups.menberName, joinMenberName],
            tenMenbers: groupsTenMenbers,
            tenMenberName: groupsTenMenberName,
        }
        const updateData = {
            menbers: [...groups.menbers, joinMenbers],
            tenMenbers: groupsTenMenbers,
        }
        db.collection('groups').doc(data.id).update(updateData)
        .then(() => {
            dispatch(fetchGroupAction(data));
        })
    }
}


// tenMenbers から該当するユーザーを消す -> メンバーを保存 -> その後、そのユーザーの groups に groupId をを加える
// props -> {index}
/*
export const recordGroupMenber = (props) => {
    return async (dispatch, getState) => {
        const newMenber = getState().groups.menbers[props.index];
    }
}
*/


export const deleteUser = (index) => {
    // groups -> tenMenber, tenMenberName から消すのみ
    return async (dispatch, getState) => {
        const groups = getState().groups;
        const groupsTenMenbers = groups.tenMenbers;
        const groupsTenMenberName = groups.tenMenberName;
        groupsTenMenbers.splice(index, 1);
        groupsTenMenberName.splice(index, 1);
        const data = {
            groupName: groups.groupName,
            groupDescription: groups.groupDescription,
            administrators: [...groups.administrators],
            created_at: groups.created_at,
            updated_at: groups.updated_at,
            id: groups.id,
            leader: groups.leader,
            URLs: groups.URLs,
            menbers: groups.menbers,
            menberName: groups.menberName,
            tenMenbers: groupsTenMenbers,
            tenMenberName: groupsTenMenberName,
        }
        const updateData = {
            tenMenbers: groupsTenMenbers,
        }
        db.collection('groups').doc(data.id).update(updateData)
        .then(() => {
            dispatch(fetchGroupAction(data));
        })
    }
    // tenMenberからひく
    // それをメンバーに入れる
    // ↑をselectorでやったあとこれをdbに反映させる
    // これだとselectorを引っ張ることができない
}


export const deleteMenber = (index, inputMenberName) => {

    return async (dispatch, getState) => {
        const groups = getState().groups;
        // 管理人かチェック用のユーザー取得
        const menbers = groups.menbers;
        const menberName = groups.menberName;
        menberName.splice(index, 1);
        const groupId = groups.id;
        const deleteUserId = menbers[index];
        const administrators = groups.administrators;
        if(administrators.includes(deleteUserId)){
            alert('このユーザーは管理者であるため削除できません')
        }else{
            menbers.splice(index, 1);
            db.collection('groups').doc(groupId).update({menbers: menbers});
            db.collection('users').doc(deleteUserId).get()
            .then(content => {
                const data = content.data();
                const deleteUserGroups = data.groups;
                const index = deleteUserGroups.indexOf(groupId);
                deleteUserGroups.splice(index, 1);
                db.collection('users').doc(deleteUserId).update({groups: deleteUserGroups})
                // administrators delete himself
                    db.collection('groups').doc(groupId).update({menbers: menbers})
                    .then(
                        dispatch(fetchGroupAction({
                            groupName: groups.groupName,
                            groupDescription: groups.groupDescription,
                            administrators: groups.administrators,
                            created_at: groups.created_at,
                            updated_at: groups.updated_at,
                            id: groups.id,
                            leader: groups.leader,
                            URLs: groups.URLs,
                            menbers: menbers,
                            menberName: menberName,
                            tenMenbers: groups.tenMenbers,
                            tenMenberName: groups.tenMenberName,
                        }))
                    )
                    .then(() => {
                        inputMenberName();
                    })
                }
            )
        }
    }
}

export const deleteTenMenber = (index, inputTenMenberName) => {

    return async (dispatch, getState) => {
        const groups = getState().groups;
        // 管理人かチェック用のユーザー取得
        const tenMenbers = groups.tenMenbers;
        const tenMenberName = groups.tenMenberName;
        tenMenbers.splice(index, 1);
        tenMenberName.splice(index, 1);
        const groupId = groups.id;
        db.collection('groups').doc(groupId).update({tenMenbers: tenMenbers})
        .then(() => {
            dispatch(fetchGroupAction({
                groupName: groups.groupName,
                groupDescription: groups.groupDescription,
                administrators: groups.administrators,
                created_at: groups.created_at,
                updated_at: groups.updated_at,
                id: groups.id,
                leader: groups.leader,
                URLs: groups.URLs,
                menbers: groups.menbers,
                menberName: groups.menberName,
                tenMenbers: tenMenbers,
                tenMenberName: tenMenberName,
            }))
        })
        .then(() => {
            inputTenMenberName();
        })
    }
}


export const addAdministrator = (menber, id) => {
    return async (dispatch, getState) => {
        const administrators = [...getState().groups.administrators, menber];
        groupsRef.doc(id).update({administrators: administrators})
        .then(() => {
            const groups = getState().groups;
            dispatch(fetchGroupAction({
                groupName: groups.groupName,
                groupDescription: groups.groupDescription,
                administrators: administrators,
                created_at: groups.created_at,
                updated_at: groups.updated_at,
                id: groups.id,
                leader: groups.leader,
                URLs: groups.URLs,
                menbers: groups.menbers,
                menberName: groups.menberName,
                tenMenbers: groups.tenMenbers,
                tenMenberName: groups.tenMenberName,
            }))
        })
    }
}


export const deleteAdministrator = (menber, id) => {
    return async (dispatch, getState) => {
        const administrators = [...getState().groups.administrators];
        const index = administrators.indexOf(menber);
        administrators.splice(index, 1);
        groupsRef.doc(id).update({administrators: administrators})
        .then(() => {
            const groups = getState().groups;
            dispatch(fetchGroupAction({
                groupName: groups.groupName,
                groupDescription: groups.groupDescription,
                administrators: administrators,
                created_at: groups.created_at,
                updated_at: groups.updated_at,
                id: groups.id,
                leader: groups.leader,
                URLs: groups.URLs,
                menbers: groups.menbers,
                menberName: groups.menberName,
                tenMenbers: groups.tenMenbers,
                tenMenberName: groups.tenMenberName,
            }))
        })
    }
}


export const checkLeader = () => {
    return async (dispatch, getState) => {
        const userId = getState().users.id;
        const leader = getState().groups.leader;
        if(userId === leader){
            return true;
        }else{
            dispatch(push('/'));
        }
    }
}