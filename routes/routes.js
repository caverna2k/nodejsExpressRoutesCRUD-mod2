import express from 'express';
import fileHandler from '../filehandler/fileHandler.js';

const { atualizarGrade, apagarGrade, adicionarGrade } = fileHandler;

const router = express.Router();

router.post('/insert', async (req, res, next) => {
  try {
    let grade = req.body;
    validateInsereGrade(grade);
    fileHandler
      .adicionarGrade(grade)
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.get('/list', async (req, res, next) => {
  try {
    console.log('get ok');
    res.status(200);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    var id = parseInt(req.params.id);
    fileHandler
      .apagarGrade(id)
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.put('/put', async (req, res, next) => {
  try {
    let grade = req.body;
    validateAtualizaGrade(grade);
    fileHandler
      .atualizarGrade(grade)
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.get('/get/:id', async (req, res, next) => {
  try {
    var id = parseInt(req.params.id);
    fileHandler
      .getById(id)
      .then((ret) => {
        res.status(200);
        res.send(ret);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.get('/get/:aluno/:disciplina', async (req, res, next) => {
  try {
    var aluno = req.params.aluno;
    var disciplina = req.params.disciplina;
    fileHandler
      .getByAlunoDisciplina(aluno, disciplina)
      .then((ret) => {
        res.status(200);
        res.send('' + ret);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.get('/getb/:disciplina/:tipo', async (req, res, next) => {
  try {
    var tipo = req.params.tipo;
    var disciplina = req.params.disciplina;
    fileHandler
      .getByDisciplinaTipo(disciplina, tipo)
      .then((ret) => {
        res.status(200);
        res.send('' + ret);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.get('/getTop3/:disciplina/:tipo', async (req, res, next) => {
  try {
    var tipo = req.params.tipo;
    var disciplina = req.params.disciplina;
    fileHandler
      .getTop3ByDisciplinaTipo(disciplina, tipo)
      .then((ret) => {
        res.status(200);
        res.send('' + ret);
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

router.patch('/patch', async (req, res, next) => {
  try {
    throw new Error('unsupported method');
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(500);
  res.send(err.message);
  res.end();
});

function validateInsereGrade(grade) {
  if (!grade) {
    throw new Error('Sem dados para inserir');
  }

  if (!grade.student || grade.student === null || grade.student === '') {
    throw new Error('Student é obrigatório.');
  }

  if (!grade.subject || grade.subject === null || grade.subject === '') {
    throw new Error('Subject é obrigatório.');
  }

  if (!grade.type || grade.type === null || grade.type === '') {
    throw new Error('Type é obrigatório.');
  }

  if (!grade.value || grade.value === null || grade.value === '') {
    throw new Error('Type é obrigatório.');
  }
}

function validateAtualizaGrade(grade) {
  validateInsereGrade(grade);
}

export default router;
