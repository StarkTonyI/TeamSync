import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.ts'
import App from './App.tsx'
import { Provider } from 'react-redux'

import { Toaster } from "./uiCompoents/ui/toaster.tsx";
import { Toaster as Sonner } from "./uiCompoents/ui/sonner.tsx";
import { TooltipProvider } from "./uiCompoents/ui/tooltip.tsx";

createRoot(document.getElementById('root')!).render(
   <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
    </TooltipProvider>
)
