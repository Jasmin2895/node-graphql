const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: 'String',
    required: true, 
    trim: true
  },
  population: {
    type: 'Number',
    required: true
  },
  currency: {
      type: "String",
      required: true
  },
  exchangeRate: {
      type: "Number",
      required: true
  }
});

// country before save
countrySchema.pre('save', function(next) {
  const country = this;
  if(!country.isModified || !country.isNew) { // don't rehash if it's an old user
    next();
  } else {
    // bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
    //   if (err) {
    //     console.log('Error hashing password for user', user.name);
    //     next(err);
    //   } else {
    //     user.password = hash;
    //     next();
    //   }
    // });
  }
});

module.exports = mongoose.model('Country', countrySchema);