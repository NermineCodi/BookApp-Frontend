import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ backgroundColor: 'lightcoral' }}>
      {/* Navigation will be shared across all pages */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          { 
            false && <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          }

          <li>
            <Link to="/not-found">Not Found</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active*/}
      <Outlet />
    </div>
  )
}


export default Layout;