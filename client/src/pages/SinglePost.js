import React, {  useContext } from 'react';
import gql from 'graphql-tag';
import {  useQuery } from '@apollo/react-hooks';

import moment from 'moment';

import { AuthContext } from '../context/auth';

import PropTypes from 'prop-types';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props){
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  console.log(postId, 'postId');
  let post;
  if (!loading) {
    const { getPost } = data;
    post = getPost;
    console.log(post, 'posts', data.getPost)
  }

  function deletePostCallback(){
    debugger;
    props.history.push('/');
  }

  console.log(data, 'data')
  let postMarkup;
  if (data) {
    if (!post) {
      postMarkup = `<p> Loading post ...</p>`
    } else {
      const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = post;
      console.log(id, 'id')
      postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated='right'
                size='small'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    {username}
                  </Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <Button as='div' labelPosition='right'
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color='teal'>
                      <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentCount}
                    </Label>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callBack={deletePostCallback}/>
                  )}

                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
  } else {
    postMarkup = <p>No data found!</p>;
  }


  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id body createdAt username likeCount
      likes{
        username
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

SinglePost.propTypes = {};

export default SinglePost;
