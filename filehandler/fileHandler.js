import { promises as fs } from 'fs';
import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
var logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'file-handler.log' }),
  ],
  format: combine(label({ label: 'file-handler.log' }), timestamp(), myFormat),
});

var filename = 'grades.json';

async function dataInit() {
  try {
    await logger.info('data init start');
    await fs.readFile(filename).then((dataGrades) => {
      let data = JSON.parse(dataGrades);
      grades = data.grades;
      nextId = data.nextId;
      logger.info(nextId);
      logger.info(grades);
    });
    logger.info('data init ok');
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function adicionarGrade(grade) {
  try {
    let data = JSON.parse(await fs.readFile(filename));
    let grades = data.grades;
    var newGrade = {
      id: data.nextId,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };
    grades.push(newGrade);
    gravarGrades(grades, data.nextId + 1);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function apagarGrade(id) {
  try {
    const data = JSON.parse(await fs.readFile(filename));
    let grades = data.grades;

    let index = grades.findIndex((grade) => grade.id === id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    grades = grades.filter((grade) => grade.id !== id);
    await gravarGrades(grades, data.nextId);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function atualizarGrade(gradeUpdate) {
  try {
    let data = JSON.parse(await fs.readFile(filename));
    let grades = data.grades;
    let index = grades.findIndex((grade) => grade.id === gradeUpdate.id);

    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    var newGrade = {
      id: gradeUpdate.id,
      student: gradeUpdate.student,
      subject: gradeUpdate.subject,
      type: gradeUpdate.type,
      value: gradeUpdate.value,
      timestamp: new Date(),
    };

    grades[index] = newGrade;
    await gravarGrades(grades, data.nextId);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function getById(id) {
  let data = JSON.parse(await fs.readFile(filename));
  let grades = data.grades;
  let index = grades.findIndex((grade) => grade.id === id);

  if (index === -1) {
    throw new Error('Registro não encontrado.');
  }
  return grades[index];
}

async function getByAlunoDisciplina(aluno, disciplina) {
  let data = JSON.parse(await fs.readFile(filename));
  let grades = data.grades.filter(
    (grade) => grade.student === aluno && grade.subject === disciplina
  );

  let nota = grades.reduce(function (acc, val) {
    return acc + val.value;
  }, 0);

  return nota;
}

async function getByDisciplinaTipo(disciplina, tipo) {
  let data = JSON.parse(await fs.readFile(filename));
  let grades = data.grades.filter(
    (grade) => grade.type === tipo && grade.subject === disciplina
  );

  let nota =
    grades.reduce(function (acc, val) {
      return acc + val.value;
    }, 0) / grades.length;

  return nota;
}

async function getTop3ByDisciplinaTipo(disciplina, tipo) {
  let data = JSON.parse(await fs.readFile(filename));
  let grades = data.grades
    .filter((grade) => grade.type === tipo && grade.subject === disciplina)
    .sort(ordemBasica)
    .slice(0, 3);

  return JSON.stringify(grades);
}

function ordemBasica(a, b) {
  return b.value - a.value;
}

async function gravarGrades(grades, nextId) {
  try {
    var data = { nextId: nextId, grades: grades };

    await fs.writeFile(filename, JSON.stringify(data));
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

export default {
  dataInit,
  atualizarGrade,
  apagarGrade,
  adicionarGrade,
  getById,
  getByAlunoDisciplina,
  getByDisciplinaTipo,
  getTop3ByDisciplinaTipo,
};
