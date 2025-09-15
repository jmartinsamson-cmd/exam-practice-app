function App() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#4CAF50', fontSize: '48px' }}>
        ✅ Success!
      </h1>
      <p style={{ fontSize: '24px', color: '#333' }}>
        React app is now working properly
      </p>
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <p>No more infinite re-rendering or server issues!</p>
      </div>
    </div>
  )
}

export default App