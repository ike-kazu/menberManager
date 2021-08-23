import React from 'react';
import {getGroupTenMenberName, getGroupAdministrators, getGroupId, getGroupMenbers, getGroupTenMenbers, getGroupMenberName, getGroupLeader} from '../../reducks/groups/selectors';
import { getUserId } from '../../reducks/users/selectors';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// UI
import { Divider, Accordion } from '../UIkit';



const useStyles = makeStyles({
    icon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    }
})

const Menber = (props) => {

    const tenMenberName = getGroupTenMenberName(props.selector);
    const administrators = getGroupAdministrators(props.selector);
    const user_id = getUserId(props.selector);
    const group_id = getGroupId(props.selector);
    const menbers = getGroupMenbers(props.selector);
    const tenMenbers = getGroupTenMenbers(props.selector);
    const menberName = getGroupMenberName(props.selector);
    const leader = getGroupLeader(props.selector);


    const classes = useStyles();


    return (
        <div className='u-text-center'>
            <div className="c-section-container">
            <ListItem>
                <h3 className='u-text__subtitle'>メンバーの一覧</h3>
                {
                    leader === user_id &&
                    <IconButton className={classes.icon} href={'/group/administrators/list/' + group_id} >
                        <EditIcon />
                    </IconButton>
                }
            </ListItem>
            </div>
            {
                administrators.includes(user_id) && (
                    <>
                        <Accordion tenMenberName={tenMenberName} menbers={menbers} tenMenbers={tenMenbers} userId={user_id} groupId={group_id} />
                        <div className='module-spacer--medium' />
                    </>
                )
            }
            <Divider
            userId={user_id}
            menbers={menbers}
            groupId={group_id}
            userId={user_id}
            menberName={menberName}
            administrators={administrators}
            dispatch={props.dispatch} />
        </div>
    )
}

export default Menber;