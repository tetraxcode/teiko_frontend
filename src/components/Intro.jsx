const Intro = () => {
  return (
    <div className="w-full">
      <div className="card h-44 m-20 bg-purple-300 shadow-2xl">
        <div className="card-body">
          <p className="text-3xl text-white font-bold drop-shadow-xl">
            Welcome to Abhinav's Demo for Teiko's take home Assignment
          </p>
          <br />
          <a
            className="btn w-1/4 normal-case text-lg"
            href="https://github.com/tetraxcode/teiko_takehome_django/blob/main/README.md"
          >
            Click here to see how it works!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intro;
