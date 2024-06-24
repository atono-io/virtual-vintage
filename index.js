
const express = require('express')
const path = require('path')
const Flagsmith = require('flagsmith-nodejs')
const AtonoSDK = require('@atono-io/web-sdk')

const flagsmith = new Flagsmith({
    environmentKey: 'jhZAAroZixcZKDPDxh46Ek'
});

const atono = AtonoSDK.Client.fromEnvironmentKey(
    'LUxVm-FKK1snXvnF2yEZ1-C7fzfxcTVg4dAcUvAelAgT',
    { apiBaseUrl: 'https://api.sandbox.atono.io' }
);

const { featureFlags } = atono;

const PORT = process.env.PORT || 5001

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

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .get('/', async (req, res) => {
		const featureFlags = await atono.getFeatureFlags();

		let atono_third_osc_enabled = false;
		try {
			 atono_third_osc_enabled = featureFlags.getBooleanValue('third-oscillator-enabled', false)
		} catch (e) {
			 console.log(`Error connecting to atono - ${e.getMessage} `, e);
		}

		console.log(`atono_third_osc_enabled: ${atono_third_osc_enabled}`);
		res.render(
			'index', 
			{ 
				atono_third_osc_enabled,
				title: 'Homepage', 
				selected: 'selected'
			}
		);
    })
	
	.get('/catalog', function(req, res, next) {
	  res.render('catalog', { title: 'Catalog', selected: 'selected' });
	})
	
	.get('/catalog/item([0-9]*)', function(req, res, next) {
	  const i = req.query.i - 1;

	  res.render('item', { 
		 title: items[i].title,
		 selected: '',
		 image: `/images/synth${[req.query.i]}.jpg`,
	  });
	})
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
