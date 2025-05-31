const Filter = ({ filter, handleFilter }) => {
  return (
    <div className="filter-container">
      <label className="filter-label">
        filter shown with:{" "}
        <input
          className="filter-input"
          value={filter}
          onChange={handleFilter}
        />
      </label>
    </div>
  );
};

export default Filter;
