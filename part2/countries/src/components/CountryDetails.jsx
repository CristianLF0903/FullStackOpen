const CountryDetails = ({ country }) => {
  return (
    <div className="countryDetails">
      <h2>{country.name.official}</h2>
      <p>
        <strong>Continente:</strong> {country.subregion}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Area:</strong> {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <div className="flagContainer">
        <img
          className="countryFlag"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
        />
      </div>
    </div>
  );
};

export default CountryDetails;
