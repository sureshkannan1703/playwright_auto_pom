import { test, expect } from '../../fixtures/test';
import { employees } from '../../../test-data/employees';

test('employee list page displays its filters and table', async ({ employeePage }) => {
  await employeePage.navigate();

  await expect(employeePage.pageHeading).toBeVisible();
  await expect(employeePage.employeeInformationHeading).toBeVisible();

  await expect(employeePage.employeeNameField).toBeVisible();
  await expect(employeePage.employeeIdField).toBeVisible();
  await expect(employeePage.employmentStatusDropdown).toBeVisible();
  await expect(employeePage.includeDropdown).toBeVisible();
  await expect(employeePage.supervisorNameField).toBeVisible();
  await expect(employeePage.jobTitleDropdown).toBeVisible();
  await expect(employeePage.subUnitDropdown).toBeVisible();

  await expect(employeePage.resetButton).toBeVisible();
  await expect(employeePage.searchButton).toBeVisible();
  await expect(employeePage.addButton).toBeVisible();
  await expect(employeePage.recordsFound).toBeVisible();
  await expect(employeePage.employeeRows.first()).toBeVisible();

  const expectedHeaders = [
    'Id',
    'First (& Middle) Name',
    'Last Name',
    'Job Title',
    'Employment Status',
    'Sub Unit',
    'Supervisor',
    'Actions',
  ];
  for (const [index, header] of expectedHeaders.entries()) {
    await expect(employeePage.employeeTableHeaders.nth(index + 1)).toContainText(header);
  }

  await expect(employeePage.pagination).toBeVisible();
  await expect(employeePage.getPageButton(1)).toBeVisible();
  await expect(employeePage.nextPageButton).toBeVisible();

  const firstRow = employeePage.employeeRows.first();
  const employeeId = (await firstRow.getByRole('cell').nth(1).innerText()).trim();
  await expect(employeePage.getEditButton(employeeId)).toBeVisible();
  await expect(employeePage.getDeleteButton(employeeId)).toBeVisible();
});

test('verify employee details', async ({ page }) => {

  const employee = employees.validEmployee;

  await expect(employee.firstName).not.toBeNull();
  await expect(employee.lastName).not.toBeNull();
  await expect(employee.empNumber).not.toBeNull();

  await expect(employee.empNumber).toMatch(/^EMP\d{4}$/);

});