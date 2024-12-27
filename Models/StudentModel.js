const db = require('../db');

const StudentModel = {
    getAll: async () => {
        return db.query('SELECT * FROM student');
    },

    add: async ({ name, class: className, rollno }) => {
        return db.query('INSERT INTO student (name, class, rollno) VALUES (?, ?, ?)', [name, className, rollno]);
    },

    edit: async (name, { class: className, rollno }) => {
        return db.query('UPDATE student SET class = ?, rollno = ? WHERE name = ?', [className, rollno, name]);
    },

    delete: async (name) => {
        return db.query('DELETE FROM student WHERE name = ?', [name]);
    },
};

module.exports = StudentModel;
