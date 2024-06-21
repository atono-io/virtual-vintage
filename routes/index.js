var express = require('express');
var router = express.Router();

const items = [
  {
    title: 'Aurora Synthex',
  },
  {
    title: 'Solaris Spectra',
  },
  {
    title: 'Celestial Voyager',
  },
  {
    title: 'Neon Nova',
  },
  {
    title: 'Cosmosynth',
  },
  {
    title: 'Celestial Harmonicus',
  },
  {
    title: 'Lunar Beatbox',
  },
  {
    title: 'Stellar Rhythm',
  },
  {
    title: 'Nexus Nova',
  },
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/catalog', function(req, res, next) {
  res.render('catalog', { title: 'Catalog' });
});

router.get('/catalog/item([0-9]*)', function(req, res, next) {
  const index = req.query.index - 1;
  
  res.render('item', { 
    title: items[index].title,
    description: items[index].description,
    image: `/images/synth${[req.query.index]}.jpg`,
  });
});


module.exports = router;
