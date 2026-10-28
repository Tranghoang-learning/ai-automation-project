[Role] 
You are an expert QA Test Engineer with 10 years of experience in software testing, specializing in writing comprehensive functional test cases.

[Context] 
We are testing the Admin Login feature of a web application. The feature handles admin authentication via username and password, manages session creation, and redirects to the Dashboard upon success.

[Instruction] 
Based on the provided User Story and Acceptance Criteria, generate a comprehensive and structured set of test cases covering positive scenarios, negative scenarios, validation rules, error handling, and edge cases.

[Input-Data] 
User Story:
"As an admin, when I am on the Login page, I want to sign in with my registered username and password so that I can access authenticated areas of the website.
Context: This story covers admin login using a username and password. A successful login creates an authenticated session and redirects the admin to the Dashboard page. The Dashboard page title must be "Dashboard".
Acceptance criteria:
- If the admin enters a valid username and password on the Login page, the system authenticates the admin successfully.
- After successful login, the system navigates the admin to the Dashboard page.
- After successful login, the page title is "Dashboard".
- If the admin enters credentials that do not match a registered account, login fails.
- If login fails because of invalid credentials, the system stays on the Login page.
- If login fails because of invalid credentials, the system shows the error message "Invalid credentials".
- If the username field is empty, the system shows "Required" under the Username field.
- If the password field is empty, the system shows "Required" under the Password field.
- If both fields are empty, the system shows "Required" under both the Username and Password fields.
- If either the Username or Password field contains only whitespace, the system treats it as empty.
- If either field is empty or contains only whitespace, the system does not send an authentication request.
- If the API returns error code 500 or an unexpected system error, login fails.
- If the API returns error code 500 or an unexpected system error, the system shows the error message "Unable to log in at this time. Please try again later."
- Username and password are mandatory fields.
- Failed authentication must not create an authenticated user session."

[Constraints] 
- Do not invent new validation rules outside the provided Acceptance Criteria.
- Ensure all error messages match the exact text specified in the criteria.

[Output-Format] 
Present the result as a Markdown table with the following columns:
| Test Case ID | Test Scenario / Description | Pre-conditions | Test Steps | Input Data | Expected Result |


---------
[Role]
Bạn là một Senior QA Automation Engineer chuyên nghiệp.

[Context]
Chúng ta đang viết kịch bản kiểm thử tự động (BDD) cho tính năng Admin Login dựa trên các test case đã tạo ở bước trước.

[Instruction]
Hãy chuyển đổi các test case sau sang định dạng Gherkin (Given-When-Then) để chuẩn bị cho việc viết code automation:
1. TC-LOGIN-01 (Đăng nhập thành công với thông tin hợp lệ)
2. TC-LOGIN-02 (Đăng nhập thất bại với thông tin không hợp lệ)
3. TC-LOGIN-06 (Xử lý trường hợp Username chỉ chứa khoảng trắng)
4. TC-LOGIN-09 (Xử lý khi API trả về lỗi 500)

[Output Format]
Trình bày dưới dạng tính năng Gherkin chuẩn:
Feature: Admin Login
  Scenario: ...
    Given ...
    When ...
    Then ...


--------
[Role]
Bạn là một Senior QA Automation Engineer chuyên nghiệp, thành thạo framework Playwright với TypeScript.

[Context]
Chúng ta cần tự động hóa các kịch bản kiểm thử (Gherkin) cho tính năng Admin Login của hệ thống web.

[Instruction]
Hãy viết mã nguồn kiểm thử tự động bằng Playwright (TypeScript) dựa trên kịch bản Gherkin sau đây:
1. Scenario: Successful login with valid credentials
2. Scenario: Failed login with invalid credentials

[Constraints]
- Sử dụng Page Object Model (POM) cơ bản.
- Đặt tên hàm và các selector rõ ràng (ví dụ: username input, password input, login button, dashboard title).
- Thêm các assertion (kiểm tra) để xác thực kết quả mong đợi (ví dụ: kiểm tra URL, tiêu đề trang "Dashboard", hoặc thông báo lỗi "Invalid credentials").

[Output Format]
Trình bày mã nguồn TypeScript rõ ràng, có chú thích chi tiết cho từng bước.    