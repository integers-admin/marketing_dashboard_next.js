const Loading = () => {
  return (
    <div className="app-bg h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400"></div>
        <p className="t-body text-emerald-200 font-medium tracking-wide">
          Loading dashboard…
        </p>
      </div>
    </div>
  );
};

export default Loading;
