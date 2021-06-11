import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDataReport } from '../action/auth';
import { Table, Pagination } from 'react-bootstrap';

const Ranking = ({ auth, getDataReport }) => {
  const [active, setActive] = useState(1);
  const [indexSum, setIndexSum] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getDataReport();
  }, [getDataReport]);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(e) => swapPagination(e)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const swapPagination = (e) => {
    const currentPage = Number(e.currentTarget.outerText);
    setActive(currentPage);
    setPage(currentPage - 1);
    setIndexSum((currentPage - 1) * 10);
  };
  const data = auth.data ? auth.data : [];

  return (
    <div className='ranking'>
      <div className='title'>RANKING</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ACCOUNT</th>
            <th>UNIT</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length !== 0 ? (
            data.slice(page * 10, page * 10 + 10).map((item, index) => {
              return (
                <tr>
                  <td>{index + indexSum + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.unit}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })
          ) : (
            <td colSpan='4' style={{ textAlign: 'center' }}>
              No record to show
            </td>
          )}
        </tbody>
      </Table>
      <div className='footer-pagination'>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};

Ranking.propTypes = {
  getDataReport: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getDataReport })(Ranking);
