import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

import {Button, Confirm, Icon} from 'semantic-ui-react';
import {FETCH_POSTS_QUERY} from '../util/graphql';

import PropTypes from 'prop-types';

const DeleteButton = ({postId, callBack}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  console.log(postId, 'postId')
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
  update(proxy){
    setConfirmOpen(false);
    const data = proxy.readQuery({
      query:FETCH_POSTS_QUERY
      });
      data.getPosts = data.getPosts.filter(p => p.postId !== postId);
      proxy.writeQuery({query: FETCH_POSTS_QUERY, data});
    if(callBack){
      console.log('Callback')
      callBack();
    }
  },
  variables: {
    postId
  }
});
  return (
    <>
      <Button as='div' color='red' onClick={() => setConfirmOpen(true)} floated='right'>
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;


DeleteButton.propTypes = {};

export default DeleteButton;
