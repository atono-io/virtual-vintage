const cool = require('cool-ascii-faces')
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

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', async (req, res) => {
	let third_osc_enabled = false;
	let atono_third_osc_enabled = false;
	try {
	    const flags = await flagsmith.getEnvironmentFlags();
	    
	    third_osc_enabled = flags.isFeatureEnabled('third_oscillator');

	    atono_third_osc_enabled = featureFlags.getBooleanValue('third-oscillator-enabled', false)
	    
	} catch (e) {
	    console.log(`Error connecting to flagsmith - ${e.getMessage} `, e);
	}

	console.log(`atono_third_osc_enabled: ${atono_third_osc_enabled}`);
	res.render(
	    'pages/index', 
	    { 
		third_osc_enabled, atono_third_osc_enabled
	    }
	);
    })
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
