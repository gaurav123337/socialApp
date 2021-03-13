import React from 'react';
import {Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

function PostCard({post : {id, body, createdAt, username, likeCount, commentCount, likes}}) {

  function likePost(){
    console.log('Post like');
  }

  function commentOnPost(){
    console.log('Comment on post')
  }
  return (
<Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{createdAt}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal' basic>
        <Icon name='heart' />
        </Button>
        <Label  basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>

      <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button color='blue' basic>
        <Icon name='comments' />
        </Button>
        <Label  basic color='blue' pointing='left'>
          {commentCount}
        </Label>
      </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard;