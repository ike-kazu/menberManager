import React, {useState} from 'react';
import {RejectButton, TwoWayDialog, NegativeError} from '../UIkit';
import {useDispatch} from 'react-redux';
import { exitGroup } from '../../reducks/groups/operations';
import { useSelector } from 'react-redux';
import { getGroupAdministrators, getGroupMenbers } from '../../reducks/groups/selectors';

const ExitButton = (props) => {
    const selector = useSelector(state => state);
    const administrators = getGroupAdministrators(selector);
    const menbers = getGroupMenbers(selector);

    const [openDialog, setOpenDialog] = useState(false);
    const [openError, setOpenError] = useState(false);

    const dispatch = useDispatch();

    const error = (
        <NegativeError
        ErrorTitle={'エラー 404'}
        ErrorSentence={'あなたはこのグループからすでに削除されています'}
        StrongErrorSentence={''}
        openError={openError} />
    )

    return(
        <>
            {error}
            <RejectButton label={'グループを抜ける'} width={256} onClick={() => {
                // 登録の処理
                    if (administrators.includes(props.userId)){
                        alert('管理者はグループから抜けることができません');
                    }else{
                        //dispatch(exitGroup(props.groupId, props.userId, props.groupMenbers));
                        setOpenDialog(true);
                    }
                }
            }
            />
            <TwoWayDialog
            dialogTitle={'本当にこのグループから抜けますか？'}
            dialogMesage={'このグループを抜けるとあなたのグループリストから削除されます。'}
            openDialog={openDialog} setOpenDialog={setOpenDialog}
            PositiveOnClick={() => {
                    if(!menbers.includes(props.userId)){
                        setOpenError(true);
                    }
                    console.log(openError);

                    if(menbers.includes(props.userId)){
                        dispatch(exitGroup(props.groupId, props.userId, props.groupMenbers));
                    }
                }} />
        </>
    )
}

export default ExitButton;