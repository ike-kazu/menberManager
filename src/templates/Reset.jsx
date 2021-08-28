import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextField} from '../components/UIkit';
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import { NegativeError, PositiveError } from '../components/UIkit';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    // onChange のイベント
    const inputEmail = useCallback( (event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    // 未入力error
    const [openError, setOpenError] = useState(false);

    const error = (
        <NegativeError
        ErrorTitle={'未入力エラー'}
        ErrorSentence={'メールアドレスが入力されていません。'}
        StrongErrorSentence={''}
        openError={openError} />
    );

    // 誤入力error
    const [openSameError, setOpenSameError] = useState(false);

    const errorSame = (
        <NegativeError
        ErrorTitle={'入力エラー'}
        ErrorSentence={'そのメールアドレスは登録されていません。'}
        StrongErrorSentence={''}
        openError={openSameError} />
    );

    // clear
    const [openClear, set0penClear] = useState(false);

    const clear = (
        <PositiveError
        ErrorTitle={'リセットが完了しました'}
        ErrorSentence={'入力されたメールアドレスにリセット用のURLを送りました。'}
        StrongErrorSentence={''}
        openError={openClear} />
    );

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
                    onClick={() => {
                        if(email === ''){
                            set0penClear(false);
                            setOpenSameError(false);
                            setOpenError(true);
                        }else{
                            setOpenError(false);
                            set0penClear(false);
                            dispatch(resetPassword(email, setOpenSameError, set0penClear))
                        }
                    }}
                 />
                 <div className='module-spacer--medium' />
                 <p onClick={() => dispatch(push('/signup'))}>ログイン画面に戻る</p>
            </div>
            {error}
            {errorSame}
            {clear}
        </div>
    )
}

export default SignIn;