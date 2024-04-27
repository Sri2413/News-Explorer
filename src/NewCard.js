import React from 'react'

export default function NewCard({ title, content, category }) {
  return (
    <>
       <div className="news-card">
    <h2>{title}</h2>
    <p>{content}</p>
    <p>Category: {category}</p>
  </div>
    </>
  )
}
