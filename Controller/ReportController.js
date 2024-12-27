const ReportModel = require('../Models/ReportModel');

const ReportController = {
    // Fetch data for the filtered table
    getFilteredData: async (req, res) => {
        const { studentName, bookName, type } = req.query;

        try {
            const [data] = await ReportModel.getFilteredTransactions({ studentName, bookName, type });

            const dropdownOptions = await ReportModel.getDropdownOptions();

            res.render('Reports', {
                title: 'Filtered Data',
                data, // Data for the table
                filters: dropdownOptions, // Dropdown options
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    },
};

module.exports = ReportController;
