import { useEffect, useState } from 'react'
import { Search, Star, MapPin } from 'lucide-react'
import Header from '../components/layout/Header'
import { getNGOs } from '../api/services'
import './pages.css'

const categories = ['All', 'Food', 'Medical', 'Relief']

export default function NGODirectory() {
  const [ngos, setNgos] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const filters = category !== 'All' ? { category } : {}
    getNGOs(filters).then(setNgos)
  }, [category])

  const filtered = ngos.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">NGO Directory</h2>
        <p className="page-subtitle">Find nearby NGOs offering relief and support</p>

        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search NGOs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`filter-tab${category === c ? ' active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ngo-list">
          {filtered.map((ngo) => (
            <div key={ngo.id} className="ngo-card">
              <div className="ngo-header">
                <strong>{ngo.name}</strong>
                <span className="ngo-category">{ngo.category}</span>
              </div>
              <div className="ngo-meta">
                <span><MapPin size={14} /> {ngo.distance}</span>
                <span><Star size={14} /> {ngo.rating}</span>
              </div>
              <div className="ngo-resources">
                {ngo.resources.map((r) => (
                  <span key={r} className="tag">{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
