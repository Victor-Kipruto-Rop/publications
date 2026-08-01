---

### 4. `content/projects/mychama.md`

```markdown
# MyChama: Local Financial Group Framework

**MyChama** is a specialized financial group management application framework engineered for cross-platform accessibility, specifically targeting localized cooperative economics.

## Project Scope

Managing local financial pools (Chamas) often relies on informal ledger systems. The MyChama project aims to digitize this process, providing transparency, automated contribution tracking, and cross-platform accessibility for all group members.

## Framework Architecture

The application was built within a highly modular `MyChama-app` directory structure, utilizing **React Native** to ensure seamless deployment across both iOS and Android from a single codebase.

*   **Core Framework:** React Native
*   **State Management:** React Context API
*   **Routing:** React Navigation
*   **Local Storage:** AsyncStorage / SQLite

## Component Iteration & State

To handle asynchronous financial updates without causing UI blocking, state is managed globally via the Context API, allowing deeply nested components to trigger contribution events cleanly.

```javascript
import React, { createContext, useReducer } from 'react';

// Contribution Reducer
const chamaReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONTRIBUTION':
            return {
                ...state,
                totalPool: state.totalPool + action.payload.amount,
                transactions: [action.payload, ...state.transactions]
            };
        default:
            return state;
    }
};

export const ChamaContext = createContext();

export const ChamaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chamaReducer, { totalPool: 0, transactions: [] });

    return (
        <ChamaContext.Provider dispatch state, value="{{" }}>
            {children}
        </ChamaContext.Provider>
    );
};
