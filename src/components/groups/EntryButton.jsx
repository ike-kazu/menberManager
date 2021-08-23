import React, {useState} from 'react';
import {PrimaryButton, PositiveError} from '../UIkit';
import {useDispatch} from 'react-redux';
import { preJoined } from '../../reducks/groups/operations';
import { useSelector } from 'react-redux';
import { getGroupTenMenbers } from '../../reducks/groups/selectors';


// entrybutton, delete, accept button


const EntryButton = (props) => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const tenMenbers = getGroupTenMenbers(selector);
    const [openError, setOpenError] = useState(false);

    const clear = (
        <PositiveError
        ErrorTitle={'完了'}
        ErrorSentence={'グループへの申請が完了しました！'}
        StrongErrorSentence={''}
        openError={openError} />
    )

    //const groups = getGroups(selector);
    return(
        <>
            {clear}
            <PrimaryButton label={'グループに入る'} onClick={() => {
                // 登録の処理
                setOpenError(true);
                console.log(openError)
                dispatch(preJoined(props.groupId, props.userId, tenMenbers))
                }
            }
            />
        </>
    )
}

export default EntryButton;