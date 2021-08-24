import React, {useEffect} from 'react';
import {Home, Menber, EntryButton, ExitButton} from '../components/groups';
import { GetGroup } from '../reducks/groups/operations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserId } from '../reducks/users/selectors';
import { getGroupMenbers, getGroupTenMenbers, getGroupAdministrators } from '../reducks/groups/selectors';
import { Tabs } from '../components/UIkit';



// DB操作ができた通知
const useGroupHome = () => {

    const dispatch = useDispatch();

    // get id
    let id = window.location.pathname.split('/')[3];
    useEffect(() => {
        if(id !== undefined){
            dispatch(GetGroup(id));
        }
    }, [id, dispatch]);


    const selector = useSelector(state => state);
    const user_id = getUserId(selector);
    const groupMenbers = getGroupMenbers(selector);
    const groupTenMenbers = getGroupTenMenbers(selector);
    const administrators = getGroupAdministrators(selector)
    const isAdministrator = administrators.includes(user_id);

    // <Home groupName={groupName} groupDescription={groupDescription} URLs={URLs} />
    // <EntryButton id={id} />
    // <Menber id={id} administrators={administrators} menbers={menbers} dispatch={dispatch} />
    return (
        <div className='u-text-center'>
            <Tabs labels={['このグループについて', 'メンバー']}>
                <div>
                    <Home selector={selector} id={id} isAdministrator={isAdministrator} />
                    {
                        !groupMenbers.includes(user_id) && !groupTenMenbers.includes(user_id)
                        ?
                        <>
                        <EntryButton groupId={id} userId={user_id} />
                        </>
                        : groupMenbers.includes(user_id) &&
                        <ExitButton groupId={id} userId={user_id} groupMenbers={groupMenbers} />
                    }
                </div>
                <div>
                    {/* 削除後の再レンダーが実行できない */}
                    <Menber selector={selector} dispatch={dispatch} />
                </div>
            </Tabs>
        </div>
    )
}

export default useGroupHome;