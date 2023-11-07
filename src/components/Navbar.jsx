const Navbar = () => {
  return (
    <div className="navbar shadow-md">
      <div className="flex-1">
        <a href="/#" className="btn btn-ghost normal-case text-xl">
          Teiko Take home
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/#">How to use?</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
