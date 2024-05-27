const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: ['http://10.19.1.232', 'http://portas.ga.com.br', 'http://localhost:3000', 'http://10.19.1.239:3000'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const port = 3001;

const db = mysql.createConnection({
    host: '10.19.1.232',
    user: 'root',
    password: '',
    database: 'projeto'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});


// fazer uma rota que seleciona tudo da tabela table_status_ports
app.get('/status', (req, res) => {
    db.query('SELECT * FROM table_status_ports', (err, result1) => {
        if (err) throw err;

        db.query('SELECT * FROM table_camera_status', (err, result2) => {
            if (err) throw err;

            res.send({ result1, result2 });
        });
    });
});

app.put('/update', (req, res) => {
    const { id_port, id_cam } = req.body;

    if (id_port) {
        db.query(`UPDATE table_status_ports SET alarme = "0" WHERE id_port = ${id_port}`, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (id_cam) {
        db.query(`UPDATE table_camera_status SET alarme = 0 WHERE id = ${id_cam}`, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).send('Erro: id_port ou id_cam deve ser fornecido');
    }

});

app.get('/history', (req, res) => {
    const { id, last_update } = req.query;

    if (!id || !last_update) {
        return res.status(400).send('Erro: id e last_update devem ser fornecidos');
    }

    const query = `
        SELECT * 
        FROM table_history 
        WHERE id_ports_fk = ? 
        AND STR_TO_DATE(last_update, '%d/%m/%Y %H:%i:%s') >= STR_TO_DATE(?, '%Y-%m-%d')
    `;

    db.query(query, [id, last_update], (err, result) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            return res.status(500).send('Erro ao buscar histórico');
        }
        res.send(result);
    });
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}
);

