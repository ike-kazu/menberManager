import React, {useCallback, useState, useEffect} from 'react';
import {TextField} from '../UIkit';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})


const useSetURL = (props) => {

    const classes = useStyles();

    const [index, setIndex] = useState(0),
          [URLname, setURLname] = useState(''),
          [URL, setURL] = useState('');

    const inputURLname = useCallback((event) => {
        setURLname(event.target.value);
    }, [setURLname]);

    const inputURL = useCallback((event) => {
        setURL(event.target.value);
    }, [setURL]);

    const addURLs = (index, URLname, URL) => {
        if(URLname === '' || URL === ''){
            return false
        }else{
            if(index === props.URLs.length){
                props.setURLs(prevState => [...prevState, {URLname: URLname, URL: URL}]);
                setIndex(index + 1);
                setURLname('');
                setURL('');
            } else{
                const newURLs = props.URLs;
                newURLs[index] = {URLname: URLname, URL: URL};
                props.setURLs(newURLs);
                setIndex(newURLs.length);
                setURLname("");
                setURL('');
            }
        }
    }

    const editURLs = (index, URLname, URL) => {
        setIndex(index);
        setURLname(URLname);
        setURL(URL);
    }

    const deleteURLs = (deleteIndex) => {
        const newURLs = props.URLs.filter((item, index) => index !== deleteIndex)
        props.setURLs(newURLs);
    }

    useEffect(() => {
        setIndex(props.URLs.length);
    }, [props.URLs.length])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>名前</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.URLs.length > 0 && (
                            props.URLs.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.URLname}</TableCell>
                                    <TableCell>{item.URL}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editURLs(index, item.URLname, item.URL)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteURLs(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextField
                        fullWidth={false} label={"URLラベル"} multiline={false} required={true}
                        onChange={inputURLname} rows={1} value={URLname} type={"text"}
                    />
                    <TextField
                        fullWidth={false} label={"URL"} multiline={false} required={true}
                        onChange={inputURL} rows={1} value={URL} type={"text"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addURLs(index, URLname, URL)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
        </div>
    )
}

export default useSetURL;