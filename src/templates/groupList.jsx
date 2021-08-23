import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import { getGroupName, getGroups } from '../reducks/users/selectors';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    marginLeft: `30%`,
    marginRight: `30%`
  },
  text: {
    textAlign: `center`,
  }
}));

const GroupList = () => {

  const classes = useStyles();

  const selector = useSelector(state => state);
  const groupNames = getGroupName(selector);
  const groups = getGroups(selector);

  return (
    <div className='u-text-center'>
      <div className='module-spacer--small' />
      <h3 className='u-text__subtitle'>所属グループ一覧</h3>
        {groupNames.length > 0 && (
            groupNames.map((groupName, index) => (
                <List component="nav" className={classes.root} aria-label="mailbox folders" key={index}>
                  <ListItem divider>
                    <ListItemText className={useStyles.text} primary={groupName} />
                      <IconButton href={'/group/home/' + groups[index]} >
                        <PageviewOutlinedIcon />
                      </IconButton>
                  </ListItem>
                  <Divider />
                </List>
            ))
        )}
    </div>
  );
}

export default GroupList;
