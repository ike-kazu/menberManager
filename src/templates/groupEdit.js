import React, {useCallback, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { saveGroup } from '../reducks/groups/operations';
import { getUserId } from '../reducks/users/selectors';
import { useSelector } from 'react-redux';

import { db } from '../firebase/index';

// UI
import {TextField, PrimaryButton} from '../components/UIkit/';

import { URL } from '../components/groups';


const useGroupEdit = () => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const user_id = getUserId(selector);

    const [groupName, setGroupName] = useState(''),
          [groupDescription, setGroupDescription] = useState(''),
          [URLs, setURLs] = useState([]),
          [menbers, setMenbers] = useState([]),
          [administrators, setAdministrators] = useState([]),
          [tenMenbers, setTenMenbers] = useState([]);

    let id = window.location.pathname.split('/')[3];
    useEffect(() => {
        if(id !== undefined){
            db.collection('groups').doc(id).get()
            .then(content => {
                const data = content.data();
                setGroupName(data.groupName);
                setGroupDescription(data.groupDescription);
                setURLs(data.URLs);
                setAdministrators(data.administrators);
                setMenbers(data.menbers);
                setTenMenbers(data.tenMenbers);
            })
        }
    }, [id])

    const inputGroupName = useCallback((event) => {
        setGroupName(event.target.value)},
        [setGroupName]);
    const inputGroupDescription = useCallback((event) => {
        setGroupDescription(event.target.value)},
        [setGroupDescription]);


    return (
        <section>
            <div className='u-text__headline u-text-center'>グループの登録・編集</div>
            <div className="c-section-container">
                <TextField
                        fullWidth={true} label={"グループ名"} multiline={false} required={true}
                        onChange={inputGroupName} rows={1} value={groupName} type={"text"}
                />
                <TextField
                fullWidth={true} label={"グループ説明・連絡"} multiline={true} required={true}
                onChange={inputGroupDescription} rows={15} value={groupDescription} type={"text"}
                />
                <div className='module-spacer__small'></div>
                <URL URLs={URLs} setURLs={setURLs} />
                <div className='module-spacer__small'></div>
                <div className='center'>
                    <PrimaryButton
                        label={'グループを保存'}
                        onClick={() => {
                            dispatch(saveGroup(id, groupName, groupDescription, user_id, URLs, menbers, administrators, tenMenbers));
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default useGroupEdit;