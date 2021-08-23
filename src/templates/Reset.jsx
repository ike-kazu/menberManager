import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextField} from '../components/UIkit';
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    // onChange のイベント
    const inputEmail = useCallback( (event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>パスワードリセット</h2>
            <div className='module-spacer--medium' />
            <TextField
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <div className='module-spacer--medium' />
            <div className={'center'}>
                <PrimaryButton
                    label={'Reset Password'}
                    onClick={() => dispatch(resetPassword(email))}
                 />
                 <div className='module-spacer--medium' />
                 <p onClick={() => dispatch(push('/signup'))}>ログイン画面に戻る</p>
            </div>
        </div>
    )
}

export default SignIn;