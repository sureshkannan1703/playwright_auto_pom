import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../api/clients/EmployeeAPI';
import { ApiAuth } from '../../api/auth/ApiAuth';

test('Verify Employee API', async ({ request, page }) => {
  const token = await ApiAuth.getAccessToken(request, page);

  const employeeApi = new EmployeeApi(request, token);

  // Get employee directory
  const directoryResponse =
    await employeeApi.getEmployeeDirectory();

  expect(directoryResponse.ok()).toBeTruthy();

  const directoryBody =
    await directoryResponse.json();

  console.log(
    'Directory Response:',
    JSON.stringify(directoryBody, null, 2)
  );

  const employee =
    directoryBody.data[0];

  console.log('Selected employee:', employee);
  console.log('Selected empNumber:', employee.empNumber);

  // Get individual employee
  const response =
    await employeeApi.getEmployee(
      employee.empNumber
    );

  console.log('Status:', response.status());
  console.log('Status text:', response.statusText());
  console.log(
    'Response:',
    await response.text()
  );

  expect(response.ok()).toBeTruthy();
});