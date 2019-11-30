import sectionsData from './sectionsData';
import employeesData from './employeesData';

const getEmployeesFromSections = () => new Promise((resolve, reject) => {
  sectionsData.getSections()
    .then((sections) => {
      employeesData.employeesDataByEmployeeId()
        .then((employees) => {
          const employeesDetail = [];
          sections.forEach((section) => {
            const newSection = { ...section };
            const findEmployees = employees.find((x) => x.sectionId === newSection.id);
            employeesDetail.push(findEmployees);
            console.log(employeesDetail);
          });
          resolve(employeesDetail);
        });
    })
    .catch((error) => reject(error));
});

export default { getEmployeesFromSections };
