const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configurar o Nodemailer para enviar e-mails
const transporter = nodemailer.createTransport({
    service: 'seu_servidor_de_email',
    auth: {
        user: 'seu_email',
        pass: 'sua_senha'
    }
});

// Configurar o body-parser para analisar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para lidar com os dados enviados pelo FormSubmit
app.post('/formsubmit', (req, res) => {
    // Os dados do formulário enviado pelo FormSubmit estarão em req.body
    const { imagem } = req.body;

    const mailOptions = {
        from: 'seu_email',
        to: 'destinatario_email',
        subject: 'Nova imagem enviada',
        text: 'Uma nova imagem foi enviada por meio do formulário.',
        attachments: [{
            filename: 'imagem.jpg', // Nome do arquivo anexado no e-mail
            content: Buffer.from(imagem, 'base64') // Conteúdo da imagem em formato base64
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail:', error);
            res.status(500).send('Ocorreu um erro ao enviar a imagem por e-mail.');
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).send('A imagem foi enviada por e-mail com sucesso.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});