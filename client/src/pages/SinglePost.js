import React, {useState, useContext} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';

import {AuthContext} from '../context/auth';

import PropTypes from 'prop-types';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';

const SinglePost = (props) => {
  const postId= props.param.match.postId;
  const {user}  = useContext(AuthContext);
  console.log(postId, 'Single post page');

  const {data: { getPost} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  let postMarkup;
  if(!getPost){
    postMarkup = `<p> Loading post ...</p>`
  } else {
    const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;
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
              <LikeButton user={user} post={{id ,likeCount, likes}}/>
              <Button as='div' labelPosition='right'
              onClick ={() => console.log('Comment on post')}
              >
                <Button basic color='teal'>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div>

    </div>
  );
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
        is username createdAt body
      }
    }
  }
`;

SinglePost.propTypes = {};

export default SinglePost;
