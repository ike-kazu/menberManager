import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextField} from '../components/UIkit';
import {signUp} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import { NegativeError } from '../components/UIkit';

const SignUp = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [confirmPassword, setConfirmPassword] = useState('');

    // onChange のイベント
    const inputUsername = useCallback( (event) => {
        setUsername(event.target.value)
    }, [setUsername]);
    const inputEmail = useCallback( (event) => {
        setEmail(event.target.value)
    }, [setEmail]);
    const inputPassword = useCallback( (event) => {
        setPassword(event.target.value)
    }, [setPassword]);
    const inputConfirmPassword = useCallback( (event) => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword]);


    // 未入力error
    const [openError, setOpenError] = useState(false);

    const error = (
        <NegativeError
        ErrorTitle={'未入力エラー'}
        ErrorSentence={'メールアドレス、およびパスワードが入力されていません。'}
        StrongErrorSentence={''}
        openError={openError} />
    );

    // パスが合わないエラー
    const [openSameError, setOpenSameError] = useState(false);

    const errorSame = (
        <NegativeError
        ErrorTitle={'入力エラー'}
        ErrorSentence={'パスワードが一致していません。'}
        StrongErrorSentence={''}
        openError={openSameError} />
    );

    return (
        <div className='c-section-container'>
            <h2 className='u-text__headline u-text-center'>アカウント登録</h2>
            <div className='module-spacer--medium' />
            <TextField
                fullWidth={true} label={'ユーザー名'} multiline={false} required={true}
                rows={1} value={username} type={'text'} onChange={inputUsername}
            />
            <TextField
                fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
                rows={1} value={email} type={'email'} onChange={inputEmail}
            />
            <TextField
                fullWidth={true} label={'パスワード'} multiline={false} required={true}
                rows={1} value={password} type={'password'} onChange={inputPassword}
            />
            <TextField
                fullWidth={true} label={'確認用パスワード'} multiline={false} required={true}
                rows={1} value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
            />
            <div className='module-spacer--medium' />
            <div className={'center'}>
                <PrimaryButton
                    label={'アカウントを登録する'}
                    onClick={() => {
                        if(username === '' || email === '' || password === '' || confirmPassword === ''){
                            setOpenError(true);
                        }else if(password !== confirmPassword){
                            setOpenError(false);
                            setOpenSameError(true);
                        }else{
                            dispatch(signUp(username, email, password, confirmPassword))
                        }
                    }}
                 />
                 <div className='module-spacer--medium' />
                 <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
            {error}
            {errorSame}
        </div>
    )
}

export default SignUp;