const StudentModel = require('../Models/StudentModel');

const StudentController = {
    // Get all students
    getAll: async (req, res) => {
        const [students] = await StudentModel.getAll();
        res.render('Student', { title: 'My Students', students: students });
    },

    // Add a new student
    addStudent: async (req, res) => {
        const { name, class: className, rollno } = req.body;
        await StudentModel.add({ name, class: className, rollno });
        res.redirect('/students'); // Redirect back to the students page
    },

    // Edit a student
    editStudent: async (req, res) => {
        const { name } = req.params;
        const { class: className, rollno } = req.body;
        await StudentModel.edit(name, { class: className, rollno });
        res.redirect('/students'); // Redirect back to the students page
    },

    // Delete a student by name
    deleteStudent: async (req, res) => {
        const { name } = req.params;
        await StudentModel.delete(name);
        res.redirect('/students'); // Redirect back to the students page
    },
};

module.exports = StudentController;
