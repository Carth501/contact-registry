import express from 'express';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as url from 'url';

const environment = process.deploy_env === "prod" ? "prod" : "dev";
const bucket = `${environment}`;
console.log('Running in ' + environment + ' mode.');
const app = express();

const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: "contact-registry-391017.firebaseapp.com",
    projectId: "contact-registry-391017",
    storageBucket: "contact-registry-391017.appspot.com",
    messagingSenderId: "839567096108",
    appId: "1:839567096108:web:f964dc36ae79192b681489"
};

const fbapp = initializeApp(firebaseConfig);
const db = getFirestore(app);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());

app.post('/api/create_record', async function (req, res) {
    try {
        const docRef = await addDoc(collection(db, bucket), {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            zip: req.body.zip,
            phoneNumber: req.body.phoneNumber,
            registrationEmail: req.body.registrationEmail || null,
            registrationMail: req.body.registrationMail || null,
            registrationTexts: req.body.registrationTexts || null,
            registrationCalls: req.body.registrationCalls || null,
            electionEmail: req.body.electionEmail || null,
            electionMail: req.body.electionMail || null,
            electionTexts: req.body.electionTexts || null,
            electionCalls: req.body.electionCalls || null
        });
        res.send(docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

app.get('/api/all_records', async function (req, res) {
    const querySnapshot = await getDocs(collection(db, "users"));
    const docs = [];
    querySnapshot.forEach((doc) => {
        docs.push(doc.data())
    });
    res.send(docs);
})

const PORT = process.env.PORT || 8080;
console.log(PORT);
app.listen(PORT, () => {
    console.log(
        `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
    );
});
