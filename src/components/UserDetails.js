import React from 'react';
import {
  Box,
  Typography,
  Link,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from '@material-ui/core/';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  cardActions: {
    display: 'flex',
    justifyContent: 'flexEnd',
  },
  headerTitle: { fontSize: 20 },
  subHeaderTitle: { fontSize: 12 },
  sectionHeader: {
    fontSize: 16,
    paddingTop: 15,
  },
}));

const UserDetails = ({ user, blogs }) => {
  const history = useHistory();
  const classes = useStyles();
  console.log(user);

  if (!user || !blogs) {
    return null;
  }
  return (
    <Box m={4}>
      <Card className={classes.root} key={user.name}>
        <CardHeader
          classes={{
            title: classes.headerTitle,
            subheader: classes.subHeaderTitle,
          }}
          title={user.name}
          subheader='added '
        />

        <CardContent>
          <ul>
            {blogs.map(
              (blog) =>
                blog.user.id === user.id && (
                  <li key={blog.id}>
                    <Typography
                      component={Link}
                      onClick={() => history.push(`/blogs/${blog.id}`)}
                    >
                      {blog.title}
                    </Typography>
                  </li>
                )
            )}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetails;
