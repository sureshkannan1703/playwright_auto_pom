import { test, expect } from '../fixtures/test';
import { employees } from '../../test-data/employees';

test('verify employee details', async ({ page }) => {

  const employee = employees.validEmployee;

  await expect(employee.firstName).not.toBeNull();
  await expect(employee.lastName).not.toBeNull();
  await expect(employee.empNumber).not.toBeNull();

  await expect(employee.empNumber).toMatch(/^EMP\d{4}$/);

});