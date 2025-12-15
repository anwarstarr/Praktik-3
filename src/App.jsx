import { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import ProductList from './components/ProductList/ProductList';
import UserCard from './components/UserCard/UserCard';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import './App.css';

// --- PERBAIKAN DI SINI (Bagian 1: Import Gambar) ---
// Import gambar dari folder assets
import imgSamsung from './assets/samsung.jpg';
import imgEvercros from './assets/evercros.jpg';
import imgAdvan from './assets/adpan.jpg';
import imgLenopo from './assets/lenopo.jpg';
import avatarImg from './assets/user-avatar.png';

// Data Mockup
const mockProducts = [
  // --- PERBAIKAN DI SINI (Bagian 2: Gunakan Variabel) ---
  // Pastikan semua key konsisten (gunakan 'image', bukan 'src')
  // dan gunakan variabel yang sudah di-import
  { id: 1, name: 'Samsung j2 Prime', price: 1500000, category: 'Handphone', image: imgSamsung, stock: 5 },
  { id: 2, name: 'Evercros', price: 1400000, category: 'Handphone', image: imgEvercros, stock: 10 },
  { id: 3, name: 'Adpan', price: 1600000, category: 'Handphone', image: imgAdvan, stock: 1 },
  { id: 4, name: 'Lenopo', price: 1200000, category: 'Handphone', image: imgLenopo, stock: 3 },
];

const mockUsers = [
  {
    id: 101,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatar: avatarImg,
    isActive: true,
  },
  {
    id: 102,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    avatar: avatarImg,
    isActive: true,
  },
  {
    id: 103,
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@example.com',
    role: 'User',
    avatar: avatarImg,
    isActive: false,
  },
  {
    id: 104,
    name: 'Ayu Lestari',
    email: 'ayu.lestari@example.com',
    role: 'User',
    avatar: avatarImg,
    isActive: true,
  },
];


function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products'); // 'products' or 'users'
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // form states
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: '', stock: 1 });

  // ... sisa kode Anda (tidak perlu diubah) ...
  
  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setUsers(mockUsers);
    }, 1000); // 1 second delay
  }, []);

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // Update quantity
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleEditUser = (userId) => {
    const u = users.find((x) => x.id === userId);
    if (!u) return;
    setNewUser({ name: u.name || '', email: u.email || '', role: u.role || 'User' });
    setEditingUser(userId);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    // sederhana: langsung hapus
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    // jika yang dihapus adalah current user, reset currentUserId
    setCurrentUserId((cur) => (cur === userId ? null : cur));
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      {/* Pass currentUser (first user) to Header to preserve single-user header behavior */}
      <Header
        title="Demo Kompoenen React Dengan props"
        subtitle="pemrograman web modern frontend dengan react js "
        user={users && users.length > 0 ? users[0] : null}
      />

      <main className="app-content App-main">
        <div className="nav-buttons">
          <button
            onClick={() => handleViewChange('products')}
            className={view === 'products' ? 'active' : ''}
          >
            Produk
          </button>
          <button
            onClick={() => handleViewChange('users')}
            className={view === 'users' ? 'active' : ''}
          >
            Pengguna
          </button>
        </div>

        {view === 'products' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button className="add-user-btn" style={{ background: '#2b9edb' }} onClick={() => setShowProductModal(true)}>+ Tambah Produk</button>
            </div>
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
            />
          </>
        ) : view === 'users' ? (
          <div className="user-list">
            <h2>Manajemen Pengguna ({users.length} users)</h2>

            <div className="add-user-wrap">
              <button className="add-user-btn" onClick={() => setShowUserModal(true)}>+ Tambah User</button>
            </div>

            

            {users && users.length > 0 ? (
              users.map((u) => (
                <UserCard
                  key={u.id}
                  user={u}
                  isCurrent={currentUserId === u.id}
                  onSetCurrent={() => setCurrentUserId(u.id)}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              ))
            ) : (
              <p>Tidak ada pengguna.</p>
            )}

            {/* Tambahkan user lain jika ada */}
          </div>
        ) : (
          <div>View not found</div>
        )}

        {showUserModal && (
          <Modal title={editingUser ? 'Edit Pengguna' : 'Tambah Pengguna'} onClose={() => { setShowUserModal(false); setEditingUser(null); }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingUser) {
                // update
                setUsers(prev => prev.map(u => u.id === editingUser ? { ...u, ...newUser } : u));
                setEditingUser(null);
              } else {
                const id = Math.max(0, ...users.map(u => u.id)) + 1;
                setUsers(prev => [...prev, { id, ...newUser, avatar: avatarImg, isActive: true }]);
              }
              setNewUser({ name: '', email: '', role: 'User' });
              setShowUserModal(false);
            }}>
              <div className="form-row">
                <label>Nama</label>
                <input value={newUser.name} onChange={(e) => setNewUser(s => ({ ...s, name: e.target.value }))} required />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser(s => ({ ...s, email: e.target.value }))} required />
              </div>
              <div className="form-row">
                <label>Role</label>
                <select value={newUser.role} onChange={(e) => setNewUser(s => ({ ...s, role: e.target.value }))}>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>User</option>
                </select>
              </div>
              <div className="actions">
                <button type="button" className="btn ghost" onClick={() => setShowUserModal(false)}>Batal</button>
                <button type="submit" className="btn primary">Simpan</button>
              </div>
            </form>
          </Modal>
        )}

        {showProductModal && (
          <Modal title="Tambah Produk" onClose={() => setShowProductModal(false)}>
            <form onSubmit={(e) => {
              e.preventDefault();
              const id = Math.max(0, ...products.map(p => p.id)) + 1;
              setProducts(prev => [...prev, { id, ...newProduct, image: imgSamsung }]);
              setNewProduct({ name: '', price: 0, category: '', stock: 1 });
              setShowProductModal(false);
            }}>
              <div className="form-row">
                <label>Nama Produk</label>
                <input value={newProduct.name} onChange={(e) => setNewProduct(s => ({ ...s, name: e.target.value }))} required />
              </div>
              <div className="form-row">
                <label>Harga</label>
                <input type="number" value={newProduct.price} onChange={(e) => setNewProduct(s => ({ ...s, price: Number(e.target.value) }))} required />
              </div>
              <div className="form-row">
                <label>Kategori</label>
                <input value={newProduct.category} onChange={(e) => setNewProduct(s => ({ ...s, category: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Stok</label>
                <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct(s => ({ ...s, stock: Number(e.target.value) }))} min={0} />
              </div>
              <div className="actions">
                <button type="button" className="btn ghost" onClick={() => setShowProductModal(false)}>Batal</button>
                <button type="submit" className="btn primary">Simpan</button>
              </div>
            </form>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;