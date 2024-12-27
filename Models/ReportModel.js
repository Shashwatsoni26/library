const db = require('../db');

const ReportModel = {
    getFilteredTransactions: async ({ studentName, bookName, type }) => {
        let query = `
            SELECT t.studentid,t.bookid, s.name as studentName, b.name as bookName, t.creationdate, t.type 
            FROM transaction t
            JOIN student s ON t.studentid = s.rollno
            JOIN book b ON t.bookid = b.code
           
        `;

        const params = [];

        if (studentName) {
            query += " AND s.name LIKE ?";
            params.push(`%${studentName}%`);
        }

        if (bookName) {
            query += " AND b.name LIKE ?";
            params.push(`%${bookName}%`);
        }

        if (type) {
            query += " AND t.type = ?";
            params.push(type);
        }

        return db.query(query, params);
    },

    getDropdownOptions: async () => {
        const [students] = await db.query('SELECT DISTINCT name FROM student');
        const [books] = await db.query('SELECT DISTINCT name FROM book');
        const [types] = await db.query('SELECT DISTINCT type FROM transaction');

        return { students, books, types };
    },
};

module.exports = ReportModel;
