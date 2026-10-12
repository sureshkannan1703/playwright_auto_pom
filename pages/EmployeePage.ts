import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EmployeePage extends BasePage {
    readonly pageHeading: Locator;
    readonly employeeInformationHeading: Locator;
    readonly sidebarSearchField: Locator;
    readonly employeeNameField: Locator;
    readonly employeeIdField: Locator;
    readonly employmentStatusDropdown: Locator;
    readonly includeDropdown: Locator;
    readonly supervisorNameField: Locator;
    readonly jobTitleDropdown: Locator;
    readonly subUnitDropdown: Locator;
    readonly resetButton: Locator;
    readonly searchButton: Locator;
    readonly addButton: Locator;
    readonly employeeTable: Locator;
    readonly employeeTableHeaders: Locator;
    readonly employeeRows: Locator;
    readonly recordsFound: Locator;
    readonly pagination: Locator;
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.getByRole("heading", { name: "PIM" });
        this.employeeInformationHeading = page.getByRole("heading", { name: "Employee Information" });
        this.sidebarSearchField = page.getByRole("textbox", { name: "Search" });
        this.employeeNameField = this.getFilterGroup("Employee Name").locator("input");
        this.employeeIdField = this.getFilterGroup("Employee Id").locator("input");
        this.employmentStatusDropdown = this.getFilterGroup("Employment Status").locator(".oxd-select-text");
        this.includeDropdown = this.getFilterGroup("Include").locator(".oxd-select-text");
        this.supervisorNameField = this.getFilterGroup("Supervisor Name").locator("input");
        this.jobTitleDropdown = this.getFilterGroup("Job Title").locator(".oxd-select-text");
        this.subUnitDropdown = this.getFilterGroup("Sub Unit").locator(".oxd-select-text");
        this.resetButton = page.getByRole("button", { name: "Reset" });
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.addButton = page.getByRole("button", { name: /Add/ });
        this.employeeTable = page.getByRole("table");
        this.employeeTableHeaders = this.employeeTable.getByRole("columnheader");
        this.employeeRows = this.employeeTable.getByRole("rowgroup").nth(1).getByRole("row");
        this.recordsFound = page.getByText(/\(\d+\) Records Found/);
        this.pagination = page.getByRole("navigation", { name: "Pagination Navigation" });
        this.nextPageButton = this.pagination.locator("button:has(i.bi-chevron-right)");
    }

    private getFilterGroup(label: string): Locator {
        return this.page.locator(".oxd-input-group").filter({
            has: this.page.getByText(label, { exact: true }),
        });
    }

    async navigate(): Promise<void> {
        await this.page.goto("/web/index.php/pim/viewEmployeeList");
    }

    async isEmployeePageLoaded(): Promise<boolean> {
        return await this.employeeInformationHeading.isVisible();
    }

    getEmployeeRow(employeeId: string): Locator {
        return this.employeeRows.filter({
            has: this.page.getByRole("cell", { name: employeeId, exact: true }),
        });
    }

    getEditButton(employeeId: string): Locator {
        return this.getEmployeeRow(employeeId).locator("button:has(i.bi-pencil-fill)");
    }

    getDeleteButton(employeeId: string): Locator {
        return this.getEmployeeRow(employeeId).locator("button:has(i.bi-trash)");
    }

    getPageButton(pageNumber: number): Locator {
        return this.pagination.getByRole("button", { name: String(pageNumber), exact: true });
    }
}
