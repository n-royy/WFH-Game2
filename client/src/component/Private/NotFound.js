import React, { Fragment } from 'react';

const NotFound = (props) => {
  return (
    <section className='container text-center' style={{ textAlign: 'center' }}>
      <Fragment>
        <h1 className='x-large text-primary margin-10rem'>
          <i className='fas fa-exclamation-triangle'></i> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </Fragment>
    </section>
  );
};

export default NotFound;
