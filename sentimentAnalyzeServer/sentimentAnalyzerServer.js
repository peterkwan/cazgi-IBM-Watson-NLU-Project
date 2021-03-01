const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res,next) => {
    var naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'keywords': {
                'emotion': true,
            },
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResult=> {
        return res.send(analyzeResult);
    })
    .catch(err => {
        return next(err);
    });
});

app.get("/url/sentiment", (req,res,next) => {
    var naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'keywords': {
                'sentiment': true,
            },
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResult=> {
        return res.send(analyzeResult);
    })
    .catch(err => {
        return next(err);
    });
});

app.get("/text/emotion", (req,res,next) => {
    var naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'keywords': {
                'emotion': true,
            },
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResult=> {
        return res.send(analyzeResult);
    })
    .catch(err => {
        return next(err);
    });
});

app.get("/text/sentiment", (req,res,next) => {
    var naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'keywords': {
                'sentiment': true,
            },
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResult=> {
        return res.send(analyzeResult);
    })
    .catch(err => {
        return next(err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

