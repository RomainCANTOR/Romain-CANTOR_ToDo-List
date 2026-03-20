import React from 'react';
import './Filters.css';

const Filters = ({ setSort, filterStatus, setFilter }) => {
  return (
    <div className="filters-bar">
      <div className="sort-section">
        <label>Trier par :</label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="date_echeance">Date échéance</option>
          <option value="date_creation">Date création</option>
          <option value="title">Nom</option>
        </select>
      </div>

      <div className="filter-section">
        <button 
          className={filterStatus === 'EN_COURS' ? 'active' : ''}
          onClick={() => setFilter(filterStatus === 'EN_COURS' ? 'TOUT' : 'EN_COURS')}
        >
          {filterStatus === 'EN_COURS' ? 'Voir toutes les tâches' : 'Masquer terminées'}
        </button>
      </div>
    </div>
  );
};

export default Filters;