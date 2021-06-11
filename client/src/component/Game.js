import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reportResult } from '../action/auth';
import { Container, Button, Modal, Image } from 'react-bootstrap';

//variable
let trueCh = 10;
let falseCh = 2;

const Game = ({ auth, reportResult }) => {
  const [play, setPlay] = useState(false);
  const [score, setScore] = useState(0);
  const [trial, setTrial] = useState(1);
  const [swapPage, setSwapPage] = useState(false);
  const [titleID, setTitleID] = useState([]);
  const [socreModal, setScoreModal] = useState(false);

  useEffect(() => {
    getId();
  }, []);

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getId = () => {
    const id = [];
    for (let i = 0; i < 10; i++) {
      const a = getRandomNumber(25);
      if (id.indexOf(a) > -1) {
        i--;
      } else {
        id[i] = a;
      }
    }
    setTitleID(id);
  };

  const showTiles = () => {
    for (var i = 0; i < titleID.length; i++) {
      var box = document.getElementById(titleID[i]);

      box.classList.add('hover');
    }
  };

  const clear = () => {
    const hoverTiles = document.querySelectorAll('.hover');

    hoverTiles.forEach((item) => {
      item.classList.remove('hover');
      item.querySelector('.back').removeAttribute('style');
    });
  };

  const playgame = () => {
    setPlay(true);
    setTimeout(() => showTiles(), 500);
    setTimeout(() => clear(), 1500);
  };

  const choose = (e, ind) => {
    if (!play) return;
    e.preventDefault();
    const a = titleID.indexOf(ind);
    const clickedTile = document.getElementById(ind);
    if (!clickedTile.classList.contains('hover')) {
      if (a > -1) {
        //the true choice
        clickedTile.querySelector('.back').style.backgroundColor = '#2ECC71';
        clickedTile.classList.add('hover');
        trueCh--;
        setScore(score + 10);
        if (trueCh === 0) {
          clear();
          getId();
          setTrial(trial + 1);
          setScoreModal(true);
        }
      } else {
        //the false choice
        clickedTile.querySelector('.back').style.backgroundColor = '#ED5565';
        clickedTile.classList.add('hover');
        falseCh--;
        setScore(score - 10);
        if (falseCh === 0) {
          clear();
          getId();
          setTrial(trial + 1);
          setScoreModal(true);
        }
      }
    }
  };

  const nextTile = () => {
    trueCh = 10;
    falseCh = 2;
    if (trial <= 5) {
      setScoreModal(false);
      playgame();
    } else if (trial > 5) {
      setScoreModal(false);
      setSwapPage(true);

      const payload = {
        username: auth.user.name,
        unit: auth.user.unit,
        score: score,
      };

      reportResult(payload);
    }
  };

  if (swapPage) {
    return <Redirect to='/ranking' />;
  }

  const createEl = () => {
    const tmp = [];
    for (let i = 0; i < 25; i++) {
      tmp.push(i);
    }
    return tmp;
  };

  return (
    <div className='bg-main-game' id='main-game'>
      <Container fluid style={{ height: '100%', position: 'absolute' }}>
        <div className='header'>
          TILES
          <span className='ml-3'>10</span>
          {' | '}
          TRIAL
          <span className='ml-3'>{trial} of 5</span>
          {' | '}
          SCORE
          <span className='ml-3'>{score}</span>
        </div>
        <div className='slide'>
          <div className='matrix'>
            {createEl().map((element, ind) => (
              <div
                id={element}
                className='tile'
                key={ind}
                onClick={(e, element) => choose(e, ind)}
              >
                <div className='flipper'>
                  <div className='front'></div>
                  <div className='back'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='footer'>
          {!play && (
            <Button
              variant='danger'
              onClick={() => {
                playgame();
              }}
            >
              START
            </Button>
          )}
        </div>
      </Container>
      <Modal show={socreModal} onHide={() => nextTile()} size='sm' centered>
        <Modal.Body>
          <div className='congrat'>
            <h4>{`Your Score: ${score}`}</h4>
          </div>
          <div className='footer' style={{ textAlign: 'center' }}>
            <Button variant='danger' onClick={() => nextTile()}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

Game.propTypes = {
  reportResult: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { reportResult })(Game);
