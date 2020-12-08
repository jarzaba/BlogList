import React from 'react';
import { Typography } from '@material-ui/core/';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AddCommentForm from './AddCommentForm';

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

const BlogDetails = ({ blog }) => {
  const classes = useStyles();
  const comments = useSelector((state) => state.comments);
  if (!blog) {
    console.log('ei löydä blogia');

    return null;
  }
  const blogComments = comments.filter((comment) => comment.blogId === blog.id);
  console.log(blog);

  return (
    <Card className={classes.root} key={blog.id}>
      <CardHeader
        classes={{
          title: classes.headerTitle,
          subheader: classes.subHeaderTitle,
        }}
        title={blog.title}
        subheader={blog.author}
      />

      <CardContent>
        <Typography variant='body1' color='textPrimary' component='p'>
          {blog.url}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {blog.user.name && `added by: ${blog.user.name} `}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          likes: {blog.likes}
        </Typography>

        <AddCommentForm blogId={blog.id} />

        <ul>
          {blogComments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BlogDetails;
