import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import parse from 'html-react-parser';
// Components
import TopMenu from './components/topmenu';

function App() {
  const API_URL = 'http://localhost:7000';
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [grid, setGrid] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function getPosts() {
      const reponses = await axios.get(`${API_URL}/posts`);
      setPosts(reponses.data);
      console.log(reponses);
    }
    getPosts();

  }, []);

  const handleClick = async (id) => {
    const post = await axios.get(`${API_URL}/posts/${id}`);
    console.log(post);
    if (post) {
      setPost(post.data);
      setGrid(false);
    }

    console.log(post);
  }

  const handleBack = () => {
    setGrid(true);
  }

  const postsList = () => {

    return (
      posts.map((post) => {
        return (
          <div key={post.id} className='col-md-4'>
            <Card key={post.id} >
              <Card.Img variant="top" src={post.img} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => handleClick(post.id)}>Read</Button>
              </Card.Body>
            </Card>
          </div>
        )
      }

      )
    )
  };


  const postDetail = () => {
    return (
      <div className='container'>
        <div className='col-md-12'>
          <Button variant="primary" onClick={() => handleBack()}>Back</Button>
          <h1>{post.title}</h1>
          <img src={post.img} alt="Post" className="img-fluid" />

          <p>{parse(post.content)}</p>
        </div>
      </div>
    )
  };

  return (
    <div className="App" >
      <TopMenu />
      <div className='container text-start'>
        <div className='row'>
          <div className='col-md-12'>
            {loading && <Spinner animation="border" variant="primary" />}
            <CardGroup>
              {posts && grid && postsList()}
              {post && !grid && postDetail()}
            </CardGroup>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
