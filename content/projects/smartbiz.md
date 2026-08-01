---

### 3. `content/projects/smartbiz.md`

```markdown
# SmartBiz: Business Management System

**SmartBiz** is a comprehensive business management architecture conceptualized and designed as a tech startup pitch presentation for a university project demo.

## System Overview

Scaling a modern enterprise requires unifying isolated business functions into a single, cohesive ecosystem. SmartBiz was architected to define the structural flows between Inventory, Finance, and Human Resources.

## Core Modules & Data Flow

The system is broken down into three distinct microservices, communicating asynchronously:

1.  **Inventory Control:** Tracks real-time stock levels, triggering automated procurement events when thresholds are breached.
2.  **Financial Ledger:** An immutable ledger system that records all transaction events, ensuring audit compliance.
3.  **HR Management:** Manages access control, employee lifecycle, and internal permissions utilizing Role-Based Access Control (RBAC).

## Relational Architecture Example

To maintain data integrity across modules, the database schema utilizes strict foreign key constraints and indexed querying. 

```sql
-- Core Ledger Schema
CREATE TABLE financial_ledger (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES hr_employees(id),
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ledger_employee ON financial_ledger(employee_id);
CREATE INDEX idx_ledger_date ON financial_ledger(created_at);
