import React from 'react';
import {getGroupName, getGroupDescription, getGroupURL} from '../../reducks/groups/selectors';
// UI
import { Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    icon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    }
})

// get props as data containing whole group data
const useGroupHome = (props) => {

    const URL = getGroupURL(props.selector);
    const classes = useStyles();

    return (
        <div className='u-text-center'>
            <div className="c-section-container">
                <ListItem>
                    <h2 className='u-text__headline u-text-center'>{getGroupName(props.selector)}</h2>
                    {
                        props.isAdministrator &&
                        <IconButton className={classes.icon} href={'/group/edit/' + props.id} >
                            <EditIcon />
                        </IconButton>
                    }
                </ListItem>
                <div className='module-spacer__small'></div>
                <div>
                    <div>
                        <h3 className='u-text__subtitle u-text-center'>概要</h3>
                        <p className='u-text-left'>{getGroupDescription(props.selector)}</p>
                    </div>
                    <div className='module-spacer--medium' />
                    <div>
                        <h3 className='u-text__subtitle u-text-center'>各リンク</h3>
                        <div>{URL.length > 0 && (
                            URL.map((item, index) => (
                                <div key={index}>
                                    <p>{item.URLname}</p><Link href={item.URL} target="_blank">{item.URL}</Link>
                                    <div className='module-spacer--small' />
                                </div>
                            ))
                        )}</div>
                    </div>
                </div>
                <div className='module-spacer__small'></div>

            </div>
        </div>
    )
}

export default useGroupHome;