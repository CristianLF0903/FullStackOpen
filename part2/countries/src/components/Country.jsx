const Country = ({ country, handleShow }) => {
  return (
    <div className="countryRow">
      <p>{country.name.common}</p>
      <button type="button" onClick={() => handleShow(country)}>
        Show
      </button>
    </div>
  );
};

export default Country;
