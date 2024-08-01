import React, { useState, useEffect } from 'react';
import {
  ProgressBar,
  ListGroup,
  Card,
  Container,
  Spinner,
} from 'react-bootstrap';

function About() {
  const [progress, setProgress] = useState(0);

  // Just to show an animation with Progressbar on page load.
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {progress < 100 && (
        <ProgressBar striped variant='danger' now={progress} />
      )}
      <Container className='d-flex justify-content-center w-100 p-5'>
        {progress < 100 ? (
          <Spinner animation='grow' />
        ) : (
          <Card>
            <Card.Header>Developed By</Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Allen Jose</ListGroup.Item>
                <ListGroup.Item>Hanish Kavalanchery Haridas</ListGroup.Item>
                <ListGroup.Item>Tinu Jos Kadavanattu</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

export default About;
