import util from 'util';

class Countries {
  constructor() {
    this.countries = [];
  }

  saveCountry(req, res) {
    const { country } = req.body;
    const message = util.format('"%s" added successfully', country);

    this.countries.unshift(country);
    return res.send({ message, countries: this.countries })
  }

  getCountries(_, res) {
    return res.send({ message:'Success', countries: this.countries })
  }

  deleteCountry(req, res) {
    const { country } = req.params;
    if (country) {
      const countryIndex = this.countries.findIndex(c => country === c.toLowerCase());
      if(countryIndex === -1) {
        return res.status(400).send({ message: util.format('Cannot find country "%s"', country) })
      }
      this.countries.splice(countryIndex, 1);
    } else {
      this.countries.shift();
    }

    return res.send({ message: 'Success', countries: this.countries })
  }
}

export default Countries;
