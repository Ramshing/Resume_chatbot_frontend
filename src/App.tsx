import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/Upload';
import ChatPage from './pages/Chat';
import LoginPage from './pages/Login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="resumes" element={<div className="p-4">Talent Pool List Component (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-4">Settings Component (Coming Soon)</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
