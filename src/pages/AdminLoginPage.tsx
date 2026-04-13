import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { authService } from '../services/authService';
import { Lock, User, ArrowRight, AlertTriangle } from 'lucide-react';

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.login(username, password);
    if (result.success) {
      navigate('/intel-dashboard');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6 selection:bg-accent selection:text-ink">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: chiselEasing }}
          className="bg-paper border-8 border-accent p-8 md:p-12 relative"
        >
          {/* Brutalist heading */}
          <div className="mb-12">
            <h1 className="text-6xl font-heading leading-none tracking-tighter mb-4">
              INTEL<br />ACCESS<span className="text-accent underline">.</span>
            </h1>
            <p className="font-bold text-sm tracking-widest uppercase opacity-40">Administrative clearance required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="block font-heading text-2xl uppercase tracking-tighter">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-paper border-4 border-ink p-4 pl-14 font-bold focus:outline-none focus:bg-accent/10 transition-colors"
                  placeholder="IDENTIFIER"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-heading text-2xl uppercase tracking-tighter">Clearance Code</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-paper border-4 border-ink p-4 pl-14 font-bold focus:outline-none focus:bg-accent/10 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-4 p-4 bg-accent/20 border-l-8 border-accent text-ink font-bold text-sm uppercase"
              >
                <AlertTriangle className="w-6 h-6" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-ink text-paper p-6 font-heading text-4xl hover:bg-accent hover:text-ink transition-all flex items-center justify-between group"
            >
              <span>{loading ? 'VERIFYING...' : 'INITIATE'}</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          {/* Decorative misalignment element */}
          <div className="absolute -z-10 bg-accent w-full h-full top-4 left-4" />
        </motion.div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-paper/40 hover:text-accent font-bold uppercase tracking-widest text-xs transition-colors"
          >
            ← Return to Public Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
