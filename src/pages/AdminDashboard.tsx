import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { blogService, Post, PostCreateInput } from '../services/blogService';
import { authService } from '../services/authService';
import {
  Plus, Edit2, Trash2, Save, X, Eye,
  LogOut, LayoutDashboard,
  AlertTriangle, CheckCircle, Search
} from 'lucide-react';

export function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState<PostCreateInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    published_date: new Date().toISOString().split('T')[0],
    read_time: 5,
    image_url: ''
  });

  useEffect(() => {
    checkAuthAndFetchPosts();
  }, []);

  const checkAuthAndFetchPosts = async () => {
    const authStatus = await authService.checkAuth();
    if (!authStatus.logged_in) {
      navigate('/intel-access');
      return;
    }

    await fetchPosts();
    setLoading(false);
  };

  const fetchPosts = async () => {
    const data = await blogService.getAllPosts();
    setPosts(data);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/intel-access');
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const openEditor = (post: Post | null = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        published_date: post.published_date,
        read_time: post.read_time,
        image_url: post.image_url
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        published_date: new Date().toISOString().split('T')[0],
        read_time: 5,
        image_url: ''
      });
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;

    if (editingPost) {
      result = await blogService.updatePost(editingPost.post_id, formData);
    } else {
      result = await blogService.createPost(formData);
    }

    if (result.success) {
      showNotification('success', editingPost ? 'Operation Successful: Data Synchronized' : 'Draft Committed to Archive');
      setIsEditorOpen(false);
      fetchPosts();
    } else {
      showNotification('error', result.message || 'Error occurred during transaction');
    }
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm('WARNING: PERMANENT DATA DELETION?')) {
      const success = await blogService.deletePost(postId);
      if (success) {
        showNotification('success', 'Entry Terminated');
        fetchPosts();
      } else {
        showNotification('error', 'Execution Failed');
      }
    }
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.post_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chiselEasing = [0.2, 0, 0, 1] as const;

  if (loading) return (
    <div className="min-h-screen bg-paper flex items-center justify-center font-heading text-4xl uppercase tracking-widest animate-pulse">
      Initializing Secure Environment...
    </div>
  );

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-ink flex flex-col">
      {/* Admin Header */}
      <header className="bg-ink text-paper p-6 border-b-8 border-accent flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-4xl font-heading tracking-tighter">INTEL<span className="text-accent underline">.</span>CTRL</h1>
          <nav className="hidden md:flex gap-6 uppercase font-bold text-xs tracking-widest opacity-60">
            <span className="text-accent flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</span>
            <span className="hover:text-paper cursor-pointer flex items-center gap-2" onClick={() => navigate('/blog')}><Eye className="w-4 h-4" /> Live Site</span>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-accent text-ink px-6 py-2 font-heading text-xl hover:bg-paper transition-colors flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> <span>Logout</span>
        </button>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h2 className="text-8xl font-heading leading-none tracking-tighter mb-4">POST<br />MANAGEMENT</h2>
            <p className="font-bold text-ink/40 uppercase tracking-widest text-sm">ARCHIVE STATUS: {posts.length} RECORDS INDEXED</p>
          </div>

          <button
            onClick={() => openEditor()}
            className="bg-ink text-paper p-6 font-heading text-4xl hover:bg-accent hover:text-ink transition-all flex items-center gap-4 misaligned-right"
          >
            <Plus className="w-10 h-10" /> <span>CREATE_ENTRY</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 flex items-center gap-6 border-4 border-ink p-4 bg-ink/5 misaligned-left">
          <Search className="w-8 h-8 opacity-40" />
          <input
            type="text"
            placeholder="SEARCH RECORDS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent font-heading text-4xl uppercase tracking-tighter focus:outline-none"
          />
        </div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`fixed top-32 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 border-4 border-ink font-bold uppercase flex items-center gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${notification.type === 'success' ? 'bg-[#76e5b1] text-ink' : 'bg-accent/40 text-ink'
                }`}
            >
              {notification.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-ink text-paper font-heading text-2xl tracking-tighter text-left">
                <th className="p-6 border-4 border-ink">ID/SLUG</th>
                <th className="p-6 border-4 border-ink">TITLE</th>
                <th className="p-6 border-4 border-ink">DATE</th>
                <th className="p-6 border-4 border-ink">METRICS</th>
                <th className="p-6 border-4 border-ink">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.post_id} className="hover:bg-accent/5 transition-colors group">
                  <td className="p-6 border-4 border-ink">
                    <div className="font-bold text-accent">{post.post_id}</div>
                    <div className="text-xs opacity-40 uppercase tracking-widest">{post.slug}</div>
                  </td>
                  <td className="p-6 border-4 border-ink font-heading text-3xl tracking-tighter">{post.title}</td>
                  <td className="p-6 border-4 border-ink font-bold">{post.published_date}</td>
                  <td className="p-6 border-4 border-ink">
                    <div className="flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.total_views}</div>
                      <div className="flex items-center gap-1"><Plus className="w-4 h-4 opacity-0" /> {post.total_likes} LIKES</div>
                    </div>
                  </td>
                  <td className="p-6 border-4 border-ink">
                    <div className="flex gap-4">
                      <button
                        onClick={() => openEditor(post)}
                        className="p-3 border-2 border-ink hover:bg-ink hover:text-paper transition-all"
                        title="Edit Record"
                      >
                        <Edit2 className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.post_id)}
                        className="p-3 border-2 border-ink hover:bg-[#e84c4c] hover:text-ink transition-all"
                        title="Delete Record"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center font-heading text-4xl opacity-20 border-4 border-ink">
                    No Records Matched Criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Slide-over Editor Panel */}
      <AnimatePresence>
        {isEditorOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="fixed inset-0 bg-ink/80 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: chiselEasing }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-4xl bg-paper border-l-8 border-accent z-[70] p-8 md:p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <div>
                  <h3 className="text-6xl font-heading tracking-tighter leading-none">
                    {editingPost ? 'UPDATE_ARCHIVE' : 'NEW_ENTRY'}
                  </h3>
                  <p className="font-bold text-accent text-sm tracking-widest mt-2">
                    {editingPost ? `RECORD ID: ${editingPost.post_id}` : 'STAGING PHASE'}
                  </p>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="p-4 border-4 border-ink hover:bg-ink hover:text-paper transition-all">
                  <X className="w-10 h-10" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-12 pb-24">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block font-heading text-2xl uppercase tracking-tighter">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block font-heading text-2xl uppercase tracking-tighter">Slug (URL)</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-heading text-2xl uppercase tracking-tighter">Excerpt / Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block font-heading text-2xl uppercase tracking-tighter">Full Content (HTML/TEXT)</label>
                  <textarea
                    rows={12}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-ink/5 border-4 border-ink p-6 font-bold focus:bg-accent/5 focus:outline-none min-h-[400px]"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="block font-heading text-2xl uppercase tracking-tighter">Publish Date</label>
                    <input
                      type="date"
                      required
                      value={formData.published_date}
                      onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                      className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block font-heading text-2xl uppercase tracking-tighter">Read Time (Mins)</label>
                    <input
                      type="number"
                      required
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                      className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block font-heading text-2xl uppercase tracking-tighter">Image URL</label>
                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full bg-ink/5 border-4 border-ink p-4 font-bold focus:bg-accent/5 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-ink text-paper p-8 font-heading text-5xl hover:bg-accent hover:text-ink transition-all flex items-center justify-between"
                >
                  <span>{editingPost ? 'SYNCHRONIZE' : 'COMMIT_RECORDS'}</span>
                  <Save className="w-12 h-12" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
