# virtual-vintage

## install dependancies
```
$ npm install
```

## Run the app locally with the following command:

```
$ DEBUG=myapp:* npm start
```

Then, load http://localhost:5001/ in your browser to access the app.

## CSS
If you add CSS to your application, make sure to run `npm run tailwind:css` each time, so the changes apply. After doing so, start your application, and you should see the changes.

### Quick way to rerun and build CSS:
```
$ npm run tailwind:css && DEBUG=myapp:* npm start
```