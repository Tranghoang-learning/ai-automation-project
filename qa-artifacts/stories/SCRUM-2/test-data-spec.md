# Test Data Specification: SCRUM-2

## User Accounts
| Account Type | Username | Password | Expected Outcome |
| :--- | :--- | :--- | :--- |
| Valid Admin | `admin_user` | `admin_pass123` | Success |
| Invalid User | `non_existent` | `any_pass` | Fail (Invalid credentials) |
| Wrong Password | `admin_user` | `wrong_pass` | Fail (Invalid credentials) |
| Empty/Whitespace | ` ` | ` ` | Fail (Required) |

## API Mocks
| Endpoint | Condition | Mock Response |
| :--- | :--- | :--- |
| `/api/auth/login` | Valid Creds | `200 OK` + Session Token |
| `/api/auth/login` | Invalid Creds | `401 Unauthorized` |
| `/api/auth/login` | System Error | `500 Internal Server Error` |
