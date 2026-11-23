import { useEffect, useState } from 'react'
import LeadFormModal from './LeadFormModal'
import './Home.css'

const API_URL = 'http://localhost:3000/api/lead'

function Home() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [activeLead, setActiveLead] = useState(null)
  const [deletingLeadId, setDeletingLeadId] = useState('')

  async function loadLeads() {
    try {
      const response = await fetch(`${API_URL}/fetch`, {
        credentials: 'include',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message)
      }

      setLeads(Array.isArray(data?.leads) ? data.leads : [])
      setPageError('')
    } catch (error) {
      setPageError(error.message || 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    fetch(`${API_URL}/fetch`, {
      credentials: 'include',
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then((data) => {
        if (!data.response.ok) {
          throw new Error(data.data?.message)
        }

        if (active) {
          setLeads(Array.isArray(data.data?.leads) ? data.data.leads : [])
          setPageError('')
        }
      })
      .catch((error) => {
        if (active) setPageError(error.message || 'Failed to fetch leads')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  function openForm(lead = null) {
    setActiveLead(lead || {})
  }

  function handleLeadSaved() {
    setActiveLead(null)
    loadLeads()
  }

  async function handleDelete(lead) {
    if (!window.confirm(`Delete ${lead.username || 'this lead'}?`)) return

    setDeletingLeadId(lead.id)
    setPageError('')
    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(lead.id)}/delete`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message)
      }

      setLeads((currentLeads) => currentLeads.filter((item) => item.id !== lead.id))
    } catch (error) {
      setPageError(error.message || 'Failed to delete lead')
    } finally {
      setDeletingLeadId('')
    }
  }

  return (
    <div className="home-page">
      <header className="home-nav">
        <a className="home-brand" href="/">
          <span className="home-brand-mark" aria-hidden="true">LM</span>
          <span>Lead Manager</span>
        </a>
        <span className="home-nav-caption">Lead management, made simple</span>
      </header>

      <main className="home-main">
        <section className="home-heading">
          <div>
            <p className="home-eyebrow">YOUR WORKSPACE</p>
            <h1>Leads</h1>
            <p>Keep track of your contacts and move every opportunity forward.</p>
          </div>
          <button className="home-add-button" type="button" onClick={() => openForm()}>
            <span aria-hidden="true">+</span> Add new lead
          </button>
        </section>

        {pageError && (
          <div className="home-alert" role="alert">
            <span>{pageError}</span>
            <button type="button" onClick={loadLeads}>Try again</button>
          </div>
        )}

        <section className="home-table-card" aria-label="Lead list">
          <div className="home-table-header">
            <div>
              <h2>All leads</h2>
              <p>{leads.length} {leads.length === 1 ? 'contact' : 'contacts'}</p>
            </div>
          </div>
          <div className="home-table-scroll">
            <table className="home-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Source</th>
                  <th scope="col">Status</th>
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="home-table-message" colSpan="6">Loading leads…</td></tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td className="home-table-message" colSpan="6">
                      <span className="home-empty-title">No leads yet</span>
                      <span>Add your first lead to get started.</span>
                    </td>
                  </tr>
                ) : leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="home-lead-name">{lead.username || '—'}</td>
                    <td>{lead.email || '—'}</td>
                    <td>{lead.phone || '—'}</td>
                    <td>{lead.source || '—'}</td>
                    <td><span className={`home-status home-status-${String(lead.status || 'new').toLowerCase()}`}>{lead.status || 'New'}</span></td>
                    <td>
                      <div className="home-row-actions">
                        <button className="home-edit-button" type="button" onClick={() => openForm(lead)}>
                          Edit
                        </button>
                        <button
                          className="home-delete-button"
                          type="button"
                          onClick={() => handleDelete(lead)}
                          disabled={deletingLeadId === lead.id}
                        >
                          {deletingLeadId === lead.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <footer className="home-footer">Lead Manager</footer>
      </main>

      {activeLead !== null && (
        <LeadFormModal
          lead={activeLead}
          onClose={() => setActiveLead(null)}
          onSaved={handleLeadSaved}
        />
      )}
    </div>
  )
}

export default Home
