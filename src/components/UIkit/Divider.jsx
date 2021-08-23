import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { RejectButton, TwoWayDialog, PositiveError, NegativeError } from '.';
import { deleteMenber } from '../../reducks/groups/operations';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    marginLeft: `30%`,
    marginRight: `30%`
  },
  rejectButton: {
    flexGrow: 1,
  }
}));

const Dividers = (props) => {

  const classes = useStyles();
  const [menberName, setMenberName] = useState([]);
  const [menbers, setMenbers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openAdError, setOpenAdError] = useState(false);
  const inputMenberName = useCallback(() => {
    setMenberName(props.menberName)
  }, [menberName])

  console.log(props.menbers)

  const clear = (
    <PositiveError
    ErrorTitle={'完了'}
    ErrorSentence={'メンバーの削除が完了しました'}
    StrongErrorSentence={''}
    openError={openError} />
)

  const error = (
  <NegativeError
  ErrorTitle={'この操作はできません'}
  ErrorSentence={'メンバーの削除が完了しました'}
  StrongErrorSentence={''}
  openError={openAdError} />
)

  return (
    <div>
        {clear}
        {error}
        {props.menberName.length > 0 && (
            props.menberName.map((menber, index) => (
                <List component="nav" className={classes.root} aria-label="mailbox folders" key={index}>
                  <ListItem divider>
                      <ListItemText primary={menber} />
                          <RejectButton label={'退会させる'} onClick={() => {
                            // props.dispatch(deleteMenber(index, inputMenberName));
                            setOpenDialog(true);
                          }} />
                          <TwoWayDialog
                            dialogTitle={'本当にこのメンバーを削除しますか？'}
                            dialogMesage={'このグループから削除するとこのメンバーはグループリストから削除されます。'}
                            openDialog={openDialog} setOpenDialog={setOpenDialog}
                            PositiveOnClick={() => {
                            setOpenError(true);

                            if(props.administrators.includes(props.menbers[index])){
                              setOpenAdError(true)
                            }else{
                              if(!menbers.includes(props.menbers[index])){
                                props.dispatch(deleteMenber(index, inputMenberName));
                                setMenbers([...menbers, props.menbers[index]]);
                              }
                            }
                          }} />
                  </ListItem>
                  <Divider />
                </List>
            ))
        )}
    </div>
  );
}

export default Dividers;
