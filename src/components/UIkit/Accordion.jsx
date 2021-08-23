import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { AdmitButton, RefuseButton } from '.';
import { acceptUser, deleteTenMenber } from '../../reducks/groups/operations';
import { joinGroup } from '../../reducks/users/operations';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '40%',
      backgroundColor: theme.palette.background.paper,
      marginLeft: `30%`,
      marginRight: `30%`,
    },
    button: {
      flexGrow: 1,
    }
  }));

const UIAccordion = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tenMenberName, setTenMenberName] = useState([]);

  const inputTenMenberName = useCallback(() => {
    setTenMenberName(props.tenMenberName)
  }, [tenMenberName])


  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>申請メンバーをみる</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.tenMenberName.length > 0
                ? props.tenMenberName.map((tenMenber, index) => (
                    <List component="nav" aria-label="mailbox folders" key={index}>
                      <ListItem>
                        <ListItemText primary={tenMenber} />
                        <div className={'module-spacer-width--medium'} />
                        <AdmitButton className={classes.button} label={'許可'} onClick={() => {
                          dispatch(joinGroup(props.tenMenbers[index], props.groupId));
                          dispatch(acceptUser(index));
                        }} />
                        <div className={'module-spacer-width--medium'} />
                        <RefuseButton label={'拒否'} onClick={() => {
                          dispatch(deleteTenMenber(index, inputTenMenberName));
                        }} />
                      </ListItem>
                    </List>
                ))
              : <p>申請しているユーザーは存在しません</p>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default UIAccordion;