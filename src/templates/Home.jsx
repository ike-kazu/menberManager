import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getUserId, getUsername} from '../reducks/users/selectors'
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../reducks/users/operations';
import Box from '@material-ui/core/Box';
import { PrimaryButton } from '../components/UIkit';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    value: {
        flexGrow: 1,
    },
    divider: {
        width: '40%',
        marginLeft: `30%`,
        marginRight: `30%`
    }
})

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);
    const classes = useStyles();

    return(
        <div className='u-text-center' >
            <div className='module-spacer--small' />
            <h2 className='u-text__subtitle'>Home</h2>
            <div className='module-spacer--medium' />
            <Box mx={'35%'} display="flex">
                <Box className='u-text-left' flexGrow={1}>
                ユーザー名：
                </Box>
                <Box>
                    {username}
                </Box>
            </Box>
            <Divider width={'40%'} className={classes.divider} />
            <div className='module-spacer--small' />
            <Box mx={'35%'} display="flex">
                <Box className='u-text-left' flexGrow={1}>
                ユーザーID：
                </Box>
                <Box>
                    {uid}
                </Box>
            </Box>
            <Divider width={'40%'} className={classes.divider} />
            <div className='module-spacer--medium' />
            <PrimaryButton onClick={() => dispatch(signOut())} label={'LOGOUT'} />
        </div>
    );
};


export default Home;