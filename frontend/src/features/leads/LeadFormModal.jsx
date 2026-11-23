import { useState } from 'react'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost']

function LeadFormModal({ lead, onClose, onSaved }) {
  const isEditing = Boolean(lead.id)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      setSaving(true)
      setNotice('')
      const response = await fetch(
        isEditing
          ? `http://localhost:3000/api/lead/${encodeURIComponent(lead.id)}/update`
          : 'http://localhost:3000/api/lead/add',
        {
          method: isEditing ? 'PATCH' : 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.get('username'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            source: formData.get('source'),
            status: formData.get('status'),
            company: formData.get('company'),
          }),
        },
      )

      const data = await response.json()
      setNotice(data?.message)

      if (!response.ok) {
        throw new Error(data?.message)
      }

      window.alert(data?.message || 'Lead saved successfully')
      onSaved()
    } catch (error) {
      console.log(error)
      setNotice(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="home-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose()
      }}
    >
      <section className="home-modal" role="dialog" aria-modal="true" aria-labelledby="lead-form-title">
        <div className="home-modal-heading">
          <div>
            <p className="home-eyebrow">{isEditing ? 'UPDATE CONTACT' : 'NEW CONTACT'}</p>
            <h2 id="lead-form-title">{isEditing ? 'Edit lead' : 'Add a lead'}</h2>
          </div>
          <button
            className="home-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={saving}
          >
            ×
          </button>
        </div>
        <form className="home-lead-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input name="username" defaultValue={lead.username || ''} autoFocus required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" defaultValue={lead.email || ''} required />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" defaultValue={lead.phone || ''} required />
          </label>
          <label>
            <span>Source</span>
            <input name="source" defaultValue={lead.source || ''} placeholder="e.g. Website, referral" required />
          </label>
          <label>
            <span>Status</span>
            <select name="status" defaultValue={lead.status || 'New'}>
              {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <input type="hidden" name="company" defaultValue={lead.company || ''} />
          {notice && <p className="home-form-error" role="status">{notice}</p>}
          <div className="home-form-actions">
            <button className="home-cancel-button" type="button" onClick={onClose} disabled={saving}>Cancel</button>
            <button className="home-add-button" type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Add lead'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default LeadFormModal
