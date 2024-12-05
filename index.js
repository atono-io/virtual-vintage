var createError = require('http-errors');
const express = require('express')
const path = require('path')
var app = express();

const { Atono } =  require('@atono-io/web-sdk');
const atono = Atono.fromEnvironmentKey(
    'csNRyOl0huBkSqJIQrsKmgZWaN5YBVizx28mRrJ75rDc',
    { apiBaseUrl: 'https://api.test.atono.io' }
);

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
		let share_preset = false;
		try {
			share_preset = featureFlags.getBooleanValue('share_preset', false)
			res.render(
				'index', 
				{ 
					share_preset,
					title: 'Homepage', 
					selected: 'selected'
				}
			);
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`share_preset on index.ejs: ${share_preset}`);
	})
	.get('/catalog', async (req, res) => {
		const featureFlags = await atono.getFeatureFlags();
		let share_preset = false;
		try {
			share_preset = featureFlags.getBooleanValue('share_preset', false)
			res.render(
				'catalog', 
				{ 
					share_preset,
					title: 'Catalog', 
					selected: 'selected'
				}
			);
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`share_preset on catalog.ejs: ${share_preset}`);
	})
	.get('/catalog/item([0-9]*)', async (req, res) => {
		const i = req.query.i - 1;
		const featureFlags = await atono.getFeatureFlags();
		let share_preset = false;
		try {
			share_preset = featureFlags.getBooleanValue('share_preset', false)
			res.render('item', { 
				share_preset,
				title: items[i].title,
				selected: '',
				image: `/images/synth${[req.query.i]}.jpg`,
				});
		} catch (error) {
			console.error('Error fetching asynchronous data:', error);
			res.status(500).send('An error occurred');
		}

		console.log(`share_preset on catalog.ejs: ${share_preset}`);
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
