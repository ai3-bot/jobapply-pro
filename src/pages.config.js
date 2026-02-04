/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Application from './pages/Application';
import Home from './pages/Home';
import PDFPreview from './pages/PDFPreview';
import criminalCheckForm from './pages/criminal-check-form';
import employmentContract from './pages/employment-contract';
import fmHrd19 from './pages/fm-hrd-19';
import fmHrd27 from './pages/fm-hrd-27';
import fmHrd30 from './pages/fm-hrd-30';
import insuranceEnrollment from './pages/insurance-enrollment';
import pdpaForm from './pages/pdpa-form';
import spsForm from './pages/sps-form';
import userDashboard from './pages/user-dashboard';
import userLogin from './pages/user-login';
import Admin from './pages/Admin';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Application": Application,
    "Home": Home,
    "PDFPreview": PDFPreview,
    "criminal-check-form": criminalCheckForm,
    "employment-contract": employmentContract,
    "fm-hrd-19": fmHrd19,
    "fm-hrd-27": fmHrd27,
    "fm-hrd-30": fmHrd30,
    "insurance-enrollment": insuranceEnrollment,
    "pdpa-form": pdpaForm,
    "sps-form": spsForm,
    "user-dashboard": userDashboard,
    "user-login": userLogin,
    "Admin": Admin,
}

export const pagesConfig = {
    mainPage: "Application",
    Pages: PAGES,
    Layout: __Layout,
};