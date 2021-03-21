import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';
import PropTypes from 'prop-types';

const DeleteButton = ({ postId, commentId, callBack }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  console.log(postId, 'postId')
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        data.getPosts = data.getPosts.filter(p => p.postId !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }

      if (callBack) {
        console.log('Callback')
        callBack();
      }
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete Post'}>
        <Button as='div' color='red' onClick={() => setConfirmOpen(true)} floated='right'>
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id username createdAt body
      }
      commentCount
    }
  }
`;

DeleteButton.propTypes = {};

export default DeleteButton;
