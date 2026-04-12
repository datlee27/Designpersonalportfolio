import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BlogPage } from './pages/BlogPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Preloader } from './components/Preloader';
import { Chatbot } from './components/Chatbot';

export default function App() {
  return (
    <>
      <Preloader />
      <Chatbot />
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/intel-access" element={<AdminLoginPage />} />
        <Route path="/intel-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

