import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextField} from '../components/UIkit';
import {signIn} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import { NegativeError } from '../components/UIkit';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

    // onChange のイベント
    const inputEmail = useCallback( (event) => {
        setEmail(event.target.value)
    }, [setEmail]);
    const inputPassword = useCallback( (event) => {
        setPassword(event.target.value)
    }, [setPassword]);

    // 未入力error
    const [openError, setOpenError] = useState(false);

    const error = (
        <NegativeError
        ErrorTitle={'未入力エラー'}
        ErrorSentence={'メールアドレス、およびパスワードが入力されていません。'}
        StrongErrorSentence={''}
        openError={openError} />
    );

    // パスが違うエラー
    const [openSameError, setOpenSameError] = useState(false);

    const errorSame = (
        <NegativeError
        ErrorTitle={'入力エラー'}
        ErrorSentence={'メールアドレス、およびパスワードが間違っています。'}
        StrongErrorSentence={''}
        openError={openSameError} />
    );

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>サインイン</h2>
            <div className='module-spacer--medium' />
            <TextField
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextField
                fullWidth={true} label={'パスワード'} multiline={false} required={true}
                rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <div className='module-spacer--medium' />
            <div className={'center'}>
                <PrimaryButton
                    label={'Sign In'}
                    onClick={() => {
                        if (email === '' || password === ''){
                            setOpenError(true);
                        }else{
                            setOpenError(false);
                            dispatch(signIn(email, password, setOpenError, setOpenSameError))}
                        }
                    }
                 />
                 <div className='module-spacer--medium' />
                 <p onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
                 <p onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
            </div>
            {error}
            {errorSame}
        </div>
    )
}

export default SignIn;