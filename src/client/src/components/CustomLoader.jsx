import React from 'react'

export default function CustomLoader() {
  return (
    <div id="backdrop">
    <div className="text-center loading">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  </div>
  )
}
