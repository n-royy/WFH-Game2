import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import logo from '../images/logo.png';

//component
import { Button } from 'react-bootstrap';

//api
import Register from './Register';

const Landing = ({ isAuthenticated }) => {
  const [modalShow, setModalShow] = useState(false);
  const [rank, setToRanking] = useState(false);

  if (rank) {
    return <Redirect to='/ranking' />;
  }

  if (isAuthenticated) {
    return <Redirect to='/game' />;
  }

  return (
    <div className='main'>
      <div className='cover black' data-color='black'></div>
      <div>
        <img src={logo} style={{ width: '200px', padding: '10px' }} alt='' />
      </div>
      <div className='container'>
        <h1 className='logo cursive'>WFH GAMES</h1>

        <div className='content'>
          <h4 className='motto'>
            <b>'MEMORY GAME'</b> - Second Challenge.
          </h4>
          <div className='subscribe'>
            <h5 className='info-text'>
              <p style={{ color: 'rgb(242 114 40)' }}>{'FDN.FIN5 & FSG.BF3'}</p>
              Join us to challenge your colleagues and get great rewards.
            </h5>
          </div>
          <div className='button-text'>
            <div className='info-text'>
              <Button
                variant='primary'
                onClick={() => setModalShow(true)}
                style={{ marginRight: '20px' }}
              >
                Start!
              </Button>
              <Button variant='success' onClick={() => setToRanking(true)}>
                Ranking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Register show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps)(Landing);
