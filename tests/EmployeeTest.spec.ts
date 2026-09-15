import { test, expect } from './fixtures/test';
import { employees } from '../test-data/Employees';

test('verify employee details', async ({ page }) => {

  const employee = employees.validEmployee;

  await expect(employee.firstName).not.toBeNull();
  await expect(employee.lastName).not.toBeNull();
  await expect(employee.employeeId).not.toBeNull();

  await expect(employee.employeeId).toMatch(/^EMP\d{4}$/);

});