import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {getGroupAdministrators, getGroupMenbers, getGroupMenberName, getGroupLeader} from '../reducks/groups/selectors';
import { useSelector } from 'react-redux';
import { GetGroup, addAdministrator, deleteAdministrator } from '../reducks/groups/operations';
import { TwoWayDialog, RejectButton, PrimaryButton, NegativeError } from '../components/UIkit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';


// UI


const useStyles = makeStyles((theme) => ({
    root: {
      width: '40%',
      marginLeft: `30%`,
      marginRight: `30%`
    },
    rejectButton: {
      flexGrow: 1,
    }
  }));

const useGroupAdministrators = (props) => {


    const dispatch = useDispatch();

    // set action
    let id = window.location.pathname.split('/')[4];
    console.log(id);
    useEffect(() => {
        if(id !== undefined){
            dispatch(GetGroup(id));
        }
    }, [id, dispatch]);


    const selector = useSelector(state => state);
    const administrators = getGroupAdministrators(selector);
    const menbers = getGroupMenbers(selector);
    const menberName = getGroupMenberName(selector);
    const leader = getGroupLeader(selector);

    // UI process
    const classes = useStyles();
    const [openDialogA, setOpenDialogA] = useState(false);
    const [openDialogB, setOpenDialogB] = useState(false);
    const [openError, setOpenError] = useState(false);
    console.log(menbers)

    const error = (
        <NegativeError
        ErrorTitle={'あなたはこのグループのリーダーです'}
        ErrorSentence={'グループのリーダーを削除することはできません'}
        StrongErrorSentence={''}
        openError={openError} />
    )

    return (
        <div className='u-text-center'>
            <div className='module-spacer--small' />
            {error}
            <h3 className='u-text__subtitle u-text-center'>管理者編集</h3>
            {menbers.map((menber, index) => (
                <List component="nav" className={classes.root} aria-label="mailbox folders" key={index}>
                  <ListItem divider>
                      <ListItemText primary={menberName[index]} />
                      {administrators.includes(menber)
                          ?<>
                            <RejectButton className={classes.rejectButton} label={'管理者から外す'} onClick={() => {
                                // ダイアログを表示 comp
                                setOpenDialogA(true);
                            }} />
                            <TwoWayDialog
                                dialogTitle={'本当にこのメンバーを管理者から外しますか？'}
                                dialogMesage={'このグループから管理者から外すとこのメンバーは管理者としての操作ができなくなります。'}
                                openDialog={openDialogA} setOpenDialog={setOpenDialogA}
                                PositiveOnClick={() => {
                                //setOpenError(true);
                                // 警告
                                if(menber !== leader){
                                    dispatch(deleteAdministrator(menber, id));
                                }else{
                                    // エラーのUI
                                    setOpenError(true);
                                }
                            }} />
                          </>
                          :<>
                            <PrimaryButton className={classes.rejectButton} label={'管理者にする'} onClick={() => {
                                // ダイアログを表示 comp
                                setOpenDialogB(true);
                            }} />
                            <TwoWayDialog
                                dialogTitle={'本当にこのメンバーを管理者にしますか？'}
                                dialogMesage={'このグループから管理者にすると、このメンバーは管理者としてのある一定の操作が可能となります。'}
                                openDialog={openDialogB} setOpenDialog={setOpenDialogB}
                                PositiveOnClick={() => {
                                //setOpenError(true);
                                console.log(menber);
                                dispatch(addAdministrator(menber, id));
                          }} />
                        </>
                      }
                  </ListItem>
                  <Divider />
                </List>
            ))}
        </div>
    )
}

export default useGroupAdministrators;