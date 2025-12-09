import Application from './pages/Application';
import Home from './pages/Home';
import Admin from './pages/Admin';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Application": Application,
    "Home": Home,
    "Admin": Admin,
}

export const pagesConfig = {
    mainPage: "Application",
    Pages: PAGES,
    Layout: __Layout,
};