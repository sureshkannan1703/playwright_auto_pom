import { APIRequestContext } from '@playwright/test';
import { env } from '../../config/env';

export class EmployeeApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly token: string
  ) {}

  async getEmployeeDirectory() {
    return this.request.get(
      `${env.apiBaseUrl}/web/index.php/api/v2/directory/employees`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  async getEmployee(empNumber: number) {
    return this.request.get(
      `${env.apiBaseUrl}/web/index.php/api/v2/pim/employees/${empNumber}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}