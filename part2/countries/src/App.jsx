import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Message from "./components/Message";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";
import "./App.css"; // Importar estilos

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((err) => {
        setMessage({
          text: `Error: ${err}`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      const filtered = countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleShowDetails = (country) => {
    setFilteredCountries([country]);
    setSearchTerm(country.name.common);
  };

  // Render message if present
  const renderMessage = () =>
    message ? <Message message={message.text} type={message.type} /> : null;

  // Render countries list or details based on filteredCountries
  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      if (searchTerm) {
        return (
          <Message
            message="Too many matches, specify another filter"
            type="alert"
          />
        );
      } else return;
    }
    if (filteredCountries.length === 1) {
      return <CountryDetails country={filteredCountries[0]} />;
    }
    if (filteredCountries.length === 0 && searchTerm) {
      return (
        <Message
          message={`No countries found for "${searchTerm}"`}
          type="error"
        />
      );
    }
    return filteredCountries.map((country) => (
      <Country
        key={country.cca3}
        country={country}
        handleShow={handleShowDetails}
      />
    ));
  };

  return (
    <div className="container">
      <h1>Countries</h1>
      <p>Start by searching for a country</p>
      <form>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      <div className="countries">
        {renderMessage()}
        {renderCountries()}
      </div>
    </div>
  );
}

export default App;
