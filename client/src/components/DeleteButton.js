import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

import {Button, Confirm, Icon} from 'semantic-ui-react';

import PropTypes from 'prop-types';

const DeleteButton = ({postId}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  console.log(postId, 'postId')
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
  update(){
    setConfirmOpen(false);
    // TODO: remove post from cache
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
