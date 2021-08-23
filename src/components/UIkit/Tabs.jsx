import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

// 追加
const TabPanel = (props) => {

    return (
      <div>
        {props.value === props.index && (
          <Box p={3}>
            {props.children}
          </Box>
        )}
      </div>
    );
}


const CenteredTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Paper className={classes.root}>
          {/* 上のヘッダーみたいなタブを構成 */}
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {props.labels.map(label => <Tab label={label}></Tab>)}
            </Tabs>
        </Paper>
        {props.children.map((child, index) =>
            <TabPanel value={value} index={index}>{child}</TabPanel>)
        }
    </div>
  );
}

export default CenteredTabs