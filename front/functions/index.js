const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const express = require('express');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const serviceAccount = require("./firebaseServiceAccount.json")
const axios = require('axios');

const from = 'joao.o.frade@gmail.com'

const emailTemplateHeader = `
  <div style="text-align: center; font-weight: bold; font-size: large;">
    {{title}}
  </div>
  <br>
  <br><b>Projeto:</b>
  <br>{{name}}
  <br>
  <br><b>Descrição:</b>
  <br>{{description}}
`
const emailTemplateProject = `
  ${emailTemplateHeader}
  <br>
  <br><b>Data início:</b>
  <br>{{startDate}}
  <br>
  <br><b>Data fim:</b>
  <br>{{endDate}}
  <br>
  <br><b>Participantes:</b>
  <br>{{participants}}
`
const xx = `

`

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://snc-rnf.firebaseio.com"
});

const firestore = admin.firestore();

// charmar este endereços no browser, para permitir envio de email
// https://myaccount.google.com/lesssecureapps
// https://accounts.google.com/DisplayUnlockCaptcha
let transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 465,
  // secure: true,
  auth: {
      user: 'joao.o.frade@gmail.com',
      pass: 'Epocler1'
  }
});

async function getCollection (collection) {
  return await firestore.collection(collection).get()
    .then(snapshot => {
      let collection = [];
      snapshot.forEach(doc => {
        collection.push(doc.data());
      });
      return collection;
    })
}

async function getDocument (collection, document) {
  return await firestore.collection(collection).doc(document).get()
    .then(doc => {
      return doc.data()
    })
}

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const mailOptions = JSON.parse(req.body);

    return transporter.sendMail(mailOptions, (erro, info) => {
      if(erro){
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });

  });
});

exports.scheduledFunction = functions.pubsub.schedule('00 00 * * mon,tue,wed,thu,fri')
  .timeZone('America/Sao_Paulo')
  .onRun(async context => {

    await SendNoticeOfTimeLeftToFinishConstruction()

    return null;
});

exports.participantScoringAlarm = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const body = JSON.parse(req.body)
    const { participant, scoresOfParticipants } = body
    // punctualityRating
    const project = await getDocument('constructions', 'a876e9a1-e111-c26b-3480-a39f4bff66b9')
    participantEmail = ''

    let abstains = { message: '', formula: '' }
    if (participant.abstainsRating === 'Baixa') {
      abstains.message = `
        <div style="margin-top: 15px; margin-left: 15px">
          <b>Abstenções</b>: ${participant.percAbstains}% (${participant.numberOfAbstain} / ${participant.numberOfPositions} * 100)
        </div>
      `
      abstains.formula = `
        <div style="color: black">
          <div style="font-size: 12px; font-weight: bold">% Abstenções:</div>
          <div style="margin-left: 10px; font-size: 10px">número de abstenções do participante / número de posicionamentos do participante</div>
        </div>
      `
    }

    let positions = { message: '', formula: '' }
    if (participant.positionsRating === 'Baixa') {
      positions.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Posicionamentos</b>: ${participant.percPositions}% (${participant.numberOfPositions} / ${scoresOfParticipants.totalNumberOfReqsAndCorrs} * 100)
        </div>
      </div>
      `
      positions.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">% Posicionamentos:</div>
          <div style="margin-left: 10px; font-size: 10px">número de posicionamentos do participante / total de requisitos e correlações do projeto</div>
        </div>
      `
    }

    let args = { message: '', formula: '' }
    if (participant.argsRating === 'Baixa') {
      args.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Argumentos</b>: ${participant.percArgs}% (${participant.numberOfArgs} / ${scoresOfParticipants.totalNumberOfArgs} * 100)
        </div>
      </div>
      `
      args.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">% Argumentos:</div>
          <div style="margin-left: 10px; font-size: 10px">número de argumentos do participante / total de argumentos do projeto</div>
        </div>
      `
    }

    let punctuality = { message: '', formula: '' }
    if (participant.punctualityRating === 'Baixa') {
      punctuality.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Pontualidade</b>: ${participant.percPunctuality}% (${participant.numberOfDaysFromFirstPositioning} / ${scoresOfParticipants.numberOfProjectDays} * 100)
        </div>
      `
      punctuality.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">% Pontualidade:</div>
          <div style="margin-left: 10px; font-size: 10px">número de dias do primeiro posicionamento do participante, em relação ao início do projeto / total de dias do projeto</div>
        </div>
      `
    }

    let firmAndBlock = { message: '', formula: '' }
    if (participant.firmAndBlockRating === 'Baixa') {
      firmAndBlock.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Firms e Blocks</b>: ${participant.percFirmAndBlock}% (${participant.numberOfFirmsAndBlocks} / ${scoresOfParticipants.totalNumberOfFirmsAndBlocks} * 100)
        </div>
      `
      firmAndBlock.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">% Firms e Blocks:</div>
          <div style="margin-left: 10px; font-size: 10px">número de firms e blocks do participante / total de firms e blocks do projeto</div>
        </div>
      `
    }

    let positioningToConverge = { message: '', formula: '' }
    if (participant.positioningToConvergeRating === 'Baixa') {
      positioningToConverge.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Posicionamentos Para Convergir</b>: ${participant.percPositioningToConverge}% (${participant.numberOfPositioningToConverge} / ${scoresOfParticipants.totalNumberOfPositioningToConverge} * 100)
        </div>
      `
      positioningToConverge.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">% Posicionamentos Para Convergir:</div>
          <div style="margin-left: 10px; font-size: 10px">número de posicionamentos para convergir do participante / total de posicionamentos para convergir do projeto</div>
        </div>
      `
    }

    let contributionArgs = { message: '', formula: '' }
    if (participant.contributionArgsRating === 'Baixa') {
      contributionArgs.message = `
        <div style="margin-top: 5px; margin-left: 15px">
          <b>Contribuição de Argumentos</b>: ${participant.percContributionArgs}% (${participant.argumentPunctuation} / (5 + 3))
        </div>
      `
      contributionArgs.formula = `
        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">Argumentos relevantes:</div>
          <div style="margin-left: 10px; font-size: 10px">número de argumentos do participante, com maioria de votos 'relevante'</div>
        </div>

        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">Argumentos Informativos:</div>
          <div style="margin-left: 10px; font-size: 10px">número de argumentos do participante, com maioria de votos 'informativo'</div>
        </div>

        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">Pontuação de Argumentos:</div>
          <div style="margin-left: 10px; font-size: 10px">(argumentos relevantes / total de argumentos, com maioria de votos 'relevante' x 5) + (argumentos informativos / total de argumentos, com maioria de votos 'informativo' x 3)</div>
        </div>

        <div style="margin-top: 10px">
          <div style="font-size: 12px; font-weight: bold">Contribuição de Argumentos:</div>
          <div style="margin-left: 10px; font-size: 10px">pontuação de argumentos / (peso do voto 'relevante' + peso do voto 'informativo')</div>
        </div>
      `
    }

    const mailOptions = {
      from: from,
      to: [participant.participantEmail],
      bcc: ['gbribeirol@gmail.com'],
      subject: '[Projeto: ' + project.name + '] Aviso de Pontuação Baixa',
      html: `
        <div margin-top: 25px; style="font-size: 15px">
          ${participant.participantName}, você está com pontuação baixa, nos itens abaixo:
        </div>

        ${abstains.message}
        ${positions.message}
        ${args.message}
        ${punctuality.message}
        ${firmAndBlock.message}
        ${positioningToConverge.message}
        ${contributionArgs.message}

        <div style="margin-top: 25px">FÓRMULAS</div>

        <div style="margin-top: 10px">
          ${abstains.formula}
          ${positions.formula}
          ${args.formula}
          ${punctuality.formula}
          ${firmAndBlock.formula}
          ${positioningToConverge.formula}
          ${contributionArgs.formula}
        </div>
      `

      // { path: 'http://localhost:8080/formulas' }

      // html: emailTemplateHeader.replace('{{title}}', 'PONTUAÇÃO BAIXA')
      //   .replace('{{name}}', project.name)
      //   .replace('{{description}}', project.description)
    }

    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log('erro', erro.toString())
      } else {
        console.log('Sended');
      }
    })
  })
})

async function SendNoticeOfTimeLeftToFinishConstruction (collection) {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0]

  let projects = await getCollection('constructions');
  let filteredProjects = projects.filter(e => !e.finished && !e.endOfProjectNotice && e.endDate === tomorrowStr)

  if (filteredProjects.length) {
    filteredProjects.forEach(project => {
      const mailOptions = {
        from: from,
        to: project.participants.map(e => `${e.name}<${e.email}>`),
        subject: '[Projeto: ' + project.name + '] Aviso de tempo que falta para fim da construção',
        html: emailTemplateProject.replace('{{title}}', 'FALTA UM DIA PARA O FIM DA CONSTRUÇÃO')
          .replace('{{name}}', project.name)
          .replace('{{description}}', project.description)
          .replace('{{startDate}}', project.startDate)
          .replace('{{endDate}}', project.endDate)
          .replace('{{participants}}', project.participants.map(e => e.name + ' (' + e.roler + ')'))
      }

      return transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
          console.log('erro', erro.toString())
        } else {
          console.log('Sended');
        }
      });

      // returnosporter.sendMail(mailOptions)
      //   .then(info => console.log('Email sent: ' + info.response))
      //   .catch(error => console.log("Error sending email ---- ", error));
    })
  }

  // firestore.collection('constructions').get()
  //   .then(docs => {
  //     let collection = [];

  //     docs.forEach(d => {
  //       collection.push(d.data());
  //     });

  //     // console.log('------------------------')
  //     // console.log('collection', collection)
  //     // console.log('------------------------')
  //   })

  // console.info('filteredProjects', filteredProjects)

  // firestore.collection('constructions').get()
  //   .then(snapshot => {
  //     console.log(snapshot)
  //     // const projects = []
  //     // snapshot.forEach(doc => array.push(doc.data()))
  //     // filteredProjects = projects.filter(e => !e.finished && !endOfProjectNotice && e.endDate === tomorrowStr)
  //     // if (filteredProjects) {
  //     //   firestore.collection("testes").doc(tomorrowStr).set(filteredProjects)
  //     // } else {
  //     //   firestore.collection("testes").doc(tomorrowStr).set({ data: tomorrowStr })
  //     // }
  //   })

  // fetch('https://us-central1-snc-rnf.cloudfunctions.net/sendMail', {
  //   method: 'post',
  //   body: JSON.stringify({
  //     from: 'joao.o.frade@gmail,com',
  //     to: ['joao.o.frade@gmail.com'],
  //     subject: 'scheduledFunction',
  //     html: 'teste'
  //   })
  // })
}

// const app = express();

// exports.app = functions.https.onRequest(app)

// createUser, onUpdate, onDelete, onWrite

// exports.createUser = functions.firestore
//   .document('/funcionarios/{documentId}')
//   .onCreate((snap, context) => {
//     const funcionario = snap.data()
//     const email = funcionario.email
//     const nome = funcionario.nome
//   })

  // exports.app = functions.https.onRequest(app);
