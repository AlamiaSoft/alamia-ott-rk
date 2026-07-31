'use client'

import React, { useState } from 'react'
import { useFormFields } from '@payloadcms/ui'
import { toast } from '@payloadcms/ui'
import { RefreshCw } from 'lucide-react'

export const SyncFeedButton: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false)
  const idField = useFormFields(([fields]) => fields.id)
  const id = idField?.value

  const handleSync = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!id) {
      toast.error('You must save the feed before syncing.')
      return
    }

    setIsSyncing(true)
    try {
      const res = await fetch(`/api/social-feeds/${id}/sync`, {
        method: 'POST',
      })
      const json = await res.json()
      
      if (res.ok) {
        toast.success(json.message || 'Feed synced successfully!')
      } else {
        toast.error(json.error || 'Failed to sync feed.')
      }
    } catch (err) {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSyncing(false)
    }
  }

  // If it's a new feed (no ID yet), we shouldn't show the button or disable it
  if (!id) return null

  return (
    <div className="field-type" style={{ marginBottom: '20px' }}>
      <button
        onClick={handleSync}
        disabled={isSyncing}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--theme-elevation-150)',
          color: 'var(--theme-text)',
          border: '1px solid var(--theme-elevation-200)',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: isSyncing ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          opacity: isSyncing ? 0.7 : 1,
        }}
      >
        <RefreshCw size={16} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
        {isSyncing ? 'Syncing Feed...' : 'Sync Feed Now'}
      </button>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      ` }} />
    </div>
  )
}
