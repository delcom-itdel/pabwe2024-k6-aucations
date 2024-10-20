import PropTypes from 'prop-types';
import AucationItem from './AucationItem'; // Component for a single aucation item

function AucationList({ aucations, onDeleteAucation }) {
  if (!aucations || aucations.length === 0) {
    return <p>No aucations available.</p>;
  }

  return (
    <div className="row"> {/* Tambahkan row untuk grid system */}
      {aucations.map((aucation) => (
        <div key={aucation.id} className="col-md-4 mb-4"> {/* Setiap card ada dalam col */}
          <AucationItem aucation={aucation} onDeleteAucation={onDeleteAucation} />
        </div>
      ))}
    </div>
  );
}

AucationList.propTypes = {
  aucations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteAucation: PropTypes.func,
};

export default AucationList;