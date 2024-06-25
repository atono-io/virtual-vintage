
var createError = require('http-errors');
const express = require('express')
const path = require('path')
var app = express();
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
 


app
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))

	.set('view engine', 'ejs')
	.get('/', async (req, res) => {
		const featureFlags = await atono.getFeatureFlags();
		let atono_third_osc_enabled = false;
		try {
			atono_third_osc_enabled = featureFlags.getBooleanValue('third-oscillator-enabled', false)
			res.render(
				'index', 
				{ 
					atono_third_osc_enabled,
					title: 'Homepage', 
					selected: 'selected'
				}
			);
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`atono_third_osc_enabled on index.ejs: ${atono_third_osc_enabled}`);
	})
	.get('/catalog', async (req, res) => {
		const featureFlags = await atono.getFeatureFlags();
		let atono_third_osc_enabled = false;
		try {
			atono_third_osc_enabled = featureFlags.getBooleanValue('third-oscillator-enabled', false)
			res.render(
				'catalog', 
				{ 
					atono_third_osc_enabled,
					title: 'Catalog', 
					selected: 'selected'
				}
			);
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`atono_third_osc_enabled on catalog.ejs: ${atono_third_osc_enabled}`);
	})
	.get('/catalog/item([0-9]*)', async (req, res) => {
		const i = req.query.i - 1;
		const featureFlags = await atono.getFeatureFlags();
		let atono_third_osc_enabled = false;
		try {
			atono_third_osc_enabled = featureFlags.getBooleanValue('third-oscillator-enabled', false)
			res.render('item', { 
				atono_third_osc_enabled,
				title: items[i].title,
				selected: '',
				image: `/images/synth${[req.query.i]}.jpg`,
				});
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`atono_third_osc_enabled on catalog.ejs: ${atono_third_osc_enabled}`);
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
	
// catch 404 and forward to error handler
 app.use(function(req, res, next) {
	next(createError(404));
})
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
})