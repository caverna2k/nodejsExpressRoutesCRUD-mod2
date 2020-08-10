import express from 'express';
import fileHandler from '../filehandler/fileHandler.js';

const {
  dataInit,
  getNextId,
  getGrades,
  atualizarGrade,
  apagarGrade,
  gravarGrades,
} = fileHandler;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default { router };
