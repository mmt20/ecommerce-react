import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import RateItem from './RateItem';
import PostRate from './PostRate';
import ViewAllReviewHook from '../../hook/review/view-all-review-hook';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const RateContainer = ({ rateAvg, rateQty }) => {
  const { id } = useParams();
  const { allReview, onPress } = ViewAllReviewHook(id);

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <h2 className="mb-0">Ratings & Reviews</h2>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <StarFill className="text-warning me-2" size={24} />
                <span className="h3 mb-0 me-2">{rateAvg}</span>
                <span className="text-muted">({rateQty} ratings)</span>
              </div>
            </Col>
          </Row>

          <PostRate />

          <div className="mt-4">
            {allReview.data && allReview.data.length > 0 ? (
              allReview.data.map((review, index) => (
                <RateItem key={index} review={review} />
              ))
            ) : (
              <div className="text-center py-5">
                <h5 className="text-muted">No ratings available</h5>
                <p>Be the first to leave a review!</p>
              </div>
            )}
          </div>

          {allReview.paginationResult &&
            allReview.paginationResult.numberOfPages >= 2 && (
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={allReview.paginationResult.numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => onPress(selected + 1)}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RateContainer;
