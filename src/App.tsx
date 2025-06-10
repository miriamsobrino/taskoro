import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import Layout from './Layout';

import { HomePage } from './pages/HomePage';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
