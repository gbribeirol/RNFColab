const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const serviceAccount = require("./firebaseServiceAccountTreviso.json");
// const serviceAccount = require("./firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://snc-rnf.firebaseio.com"
});

const app = express();

app.use(cors({ origin: true }));

app.get('/ping1', (req, res) => {
  res.send('ping1!');
});

app.get('/createRequirements', async (req, res) =>{
  let operats = await getOperat();
  await createRequirements(operats)
  // response.render('index', { db_result });
  res.send('Dados copiados!')
});

app.get('/createTotalEarnedMonthPoints', async (req, res) =>{
  let users = await getCollection('users');
  await createTotalEarnedMonthPoints(users)
  res.send('Feito!')
});
async function createTotalEarnedMonthPoints (collection) {
  const firestore = await admin.firestore();

  for (let e of collection) {
    e.totalEarnedMonthPoints = 0
    firestore.collection("users2").doc(e.id).set(e)
  }
}

app.get('/updateMonthlyRank', async (req, res) =>{
  let users = await getCollection('users2')
  let ordered = users.sort((a, b) => (a.totalEarnedMonthPoints < b.totalEarnedMonthPoints ? 1 : -1))

  await updateMonthlyRank(ordered)
  res.send('Coleção monthlyRank atualizada!')
});

async function getOperat () {
  const firestore = await admin.firestore();
  // .doc('056ab795-f67e-2e84-ee3e-fbca954b8cc8')
  return await firestore.collection('operationalizations').get()
    .then(snapshot => {
      let c = [];
      snapshot.forEach(doc => {
        let o = doc.data()
        o.ascendents.forEach(e => {
          e.req = e.operat
          delete e.operat
        })
        o.descendents.forEach(e => {
          e.req = e.operat
          delete e.operat
        })
        c.push(o);
      });
      return c;
    })
}

async function createRequirements (c) {
  const firestore = await admin.firestore();
  c.forEach(e => {
    firestore.collection("requirements").doc(e.id).set(e)
  });
}

async function updateMonthlyRank (users) {
  let id = yyyymm();
  top3 = [];

  for (let i = 0; i < 3; ++i) {
    top3.push({
      id: users[i].id,
      name: users[i].name,
      email: users[i].email,
      avatarUrl: users[i].avatarUrl,
      branch: users[i].branch,
      department: users[i].department,
      OneSignalAPIKey: users[i].OneSignalAPIKey ? users[i].OneSignalAPIKey : '',
      totalEarnedMonthPoints: users[i].totalEarnedMonthPoints
    })
  }

  const firestore = await admin.firestore();
  firestore.collection('monthlyRank').doc(id).set({
    id,
    year: id.substring(0, 4),
    month: id.substring(4, 6),
    top3
  })

  users.filter(e => e.totalEarnedMonthPoints > 0).forEach(e => {
    e.totalEarnedMonthPoints = 0
    firestore.collection("users2").doc(e.id).set(e)
  });
}

async function getCollection (collection) {
  const firestore = await admin.firestore();
  return await firestore.collection(collection).get()
    .then(snapshot => {
      let collection = [];
      snapshot.forEach(doc => {
        collection.push(doc.data());
      });
      return collection;
    })
}

function yyyymm() {
  var now = new Date();
  var yyyyy = now.getFullYear();
  var m = now.getMonth() + 1;
  var mm = m < 10 ? '0' + m : m;
  return yyyyy.toString() + mm.toString();
}

exports.app = functions.https.onRequest(app);

// const functions = require('firebase-functions');
// const express = require('express');
// const app = express();
// const port = 3000;

// // [START middleware]
// const cors = require('cors')({ origin: true });
// app.use(cors);
// // [END middleware]

// app.listen(port, () => {
//   console.log(`Ouvindo a porta ${port}.`)
// })

// app.get('/ping', (req, res) => {
//   res.send('PING OK!!!!!!');
// })

// exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
