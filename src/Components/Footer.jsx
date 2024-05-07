export const Footer = () => {
  const today = new Date()
  return (
    <footer className="Footer">
      <p>Copyright {today.getFullYear()}</p>
    </footer>

  )
}
