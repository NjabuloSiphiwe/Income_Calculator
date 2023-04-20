import {createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addExpenseAction, setIncomeAction, incrementActionPerformed } from '../expense-slice';
export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({

    // predicate: (action)=> {
    //     return action.type ==="expenseSlice/addExpenseAction" || action.type ==="expenseSlice/setIncomeAction" 
    // },
    matcher: isAnyOf(setIncomeAction,addExpenseAction),
    effect: async (action,listenerAPI)=> {
        console.log("action", action)
        listenerAPI.dispatch(incrementActionPerformed())
        console.log("New store value ", listenerAPI.getState())
        
    
    
    }
})