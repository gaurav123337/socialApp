import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const Home = () => {
  const { loading, data  } = useQuery(FETCH_POSTS_QUERY);
  let posts;
  if(!loading) {
    const { getPosts }  = data;
    posts = getPosts;
  }

  return (
    <div>
       <Grid columns={3} fluid>
       <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading ...</h1>
          ) : (
              posts && posts.map(post => {
                return (
                  <Grid.Column key={post.id}>
                    <PostCard post={post}/>
                  </Grid.Column>
                )
              })
          )}
        </Grid.Row>
    </Grid>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

Home.propTypes = {};

export default Home;
